import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-credentials";
import { Readable } from "stream";

export const getObject = async (key: string): Promise<Readable | undefined> => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);
    if (data.Body instanceof Readable) {
      return data.Body;
    }

    console.log("No readable stream returned");
  } catch (err) {
    console.error("S3 Get Error:", err);
  }
};
