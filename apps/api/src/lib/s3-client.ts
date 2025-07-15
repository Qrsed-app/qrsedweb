import { CreateBucketCommand, GetObjectCommand, HeadBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

console.log('🔧 MinIO Config:', {
  endpoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY?.substring(0, 4) + '...',
  bucket: process.env.MINIO_BUCKET
})

const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: 'us-east-1', // MinIO doesn't care about region
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for MinIO
})

const BUCKET_NAME = process.env.MINIO_BUCKET || 'dnd-images'

export const initializeBucket = async () => {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }))
    console.log(`✅ Bucket ${BUCKET_NAME} exists`)
  } catch (error) {
    console.log(`🔧 Creating bucket ${BUCKET_NAME}`)
    try {
      await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }))
      console.log(`✅ Bucket ${BUCKET_NAME} created`)
    } catch (createError) {
      console.error('❌ Failed to create bucket:', createError)
      throw createError
    }
  }
}

export const uploadImage = async (
  roomId: string,
  noteId: string,
  filename: string,
  buffer: Buffer,
  mimeType: string
): Promise<{ key: string }> => {
  const key = `rooms/${roomId}/notes/${noteId}/${filename}`

  console.log('🌊 MinIO upload starting:', {
    bucket: BUCKET_NAME,
    key,
    bufferSize: buffer.length,
    mimeType,
    endpoint: process.env.MINIO_ENDPOINT
  });

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  })

  try {
    console.log('📡 Sending PutObjectCommand to MinIO...');
    const result = await s3Client.send(command);
    console.log('✅ MinIO PutObject response:', {
      etag: result.ETag,
      key,
      success: true
    });

    return { key };
  } catch (error) {
    console.error('❌ MinIO PutObject failed:', {
      error: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'unknown',
      code: (error as any)?.code || 'unknown',
      key,
      bucket: BUCKET_NAME
    });
    throw error;
  }
}


export const getImageData = async (key: string): Promise<{ data: Buffer; contentType: string | undefined }> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  const response = await s3Client.send(command)
  const data = Buffer.from(await response.Body!.transformToByteArray())

  return {
    data,
    contentType: response.ContentType
  }
}

export { BUCKET_NAME, s3Client }
