import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { s3Client } from "./s3-credentials";

type FileType = Buffer | Readable;

export const putObject = async (
  file: FileType,
  fileName: string,
  mimetype: string
): Promise<{ url: string; key: string } | undefined> => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;

    if (!bucketName || !region) {
      throw new Error("AWS_BUCKET_NAME or AWS_REGION is not defined");
    }

    const params : any = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ContentType: mimetype || "application/octet-stream",
      // ACL: "public-read", 
    };

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode !== 200) {
      console.error("Upload failed with status:", data.$metadata.httpStatusCode);
      return;
    }

    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    return { url, key: fileName };
  } catch (error) {
    console.error("S3 Upload Error:", error);
  }
};
