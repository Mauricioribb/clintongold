// Cliente R2 usando AWS SDK (compatível com S3)
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

let s3Client: S3Client | null = null;

export function getR2Client(): S3Client | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  if (!s3Client) {
    s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return s3Client;
}

export async function uploadToR2(filename: string, file: File): Promise<string> {
  const client = getR2Client();
  if (!client) {
    throw new Error('R2 credentials not configured');
  }

  const bucketName = process.env.R2_BUCKET_NAME || 'clinton-gold-images';
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const publicUrl = process.env.R2_PUBLIC_URL || 
                    `https://pub-${process.env.R2_ACCOUNT_ID}.r2.dev`;
  
  return `${publicUrl}/${filename}`;
}
