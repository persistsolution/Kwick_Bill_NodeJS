import { DeleteObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-credentials";

interface DeleteObjectResult {
  success: boolean;
  status: number;
  message: string;
  data?: unknown;
}

export const deleteObject = async (key: string): Promise<DeleteObjectResult> => {
  // Validate environment variable
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) {
    const errorMsg = "AWS_BUCKET_NAME environment variable is not configured";
    console.error(errorMsg);
    return {
      success: false,
      status: 500,
      message: errorMsg
    };
  }

  // Validate key input
  if (!key || typeof key !== "string") {
    const errorMsg = "Invalid S3 key provided";
    console.error(errorMsg);
    return {
      success: false,
      status: 400,
      message: errorMsg
    };
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);
    const statusCode = response.$metadata.httpStatusCode || 200;

    if (statusCode === 204) {
      console.log(`Successfully deleted S3 object: ${key}`);
      return {
        success: true,
        status: 204,
        message: "Object deleted successfully"
      };
    }

    console.warn(`Unexpected status code ${statusCode} when deleting ${key}`);
    return {
      success: false,
      status: statusCode,
      message: `Unexpected response status: ${statusCode}`,
      data: response
    };

  } catch (error) {
    let errorMessage = "Failed to delete S3 object";
    let statusCode = 500;

    if (error instanceof S3ServiceException) {
      errorMessage = `S3 Error: ${error.name} - ${error.message}`;
      statusCode = error.$metadata?.httpStatusCode || 500;

      if (error.name === "NoSuchKey") {
        errorMessage = `Object not found: ${key}`;
        statusCode = 404;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error(`Error deleting ${key}:`, errorMessage);
    return {
      success: false,
      status: statusCode,
      message: errorMessage,
      data: error
    };
  }
};