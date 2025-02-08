import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const API_URL = 'http://65.0.75.79:8000/upload/';
const S3_BUCKET = 'loanaiq-sheet-data';

const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    }
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to upload file');
    }
};

export const uploadToS3 = async (data) => {
    const userId = Math.floor(1000 + Math.random() * 9000);
    const fileName = `${userId}.json`;

    try {
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: fileName,
            Body: JSON.stringify(data),
            ContentType: 'application/json',
        });

        await s3Client.send(command);
        return userId;
    } catch (error) {
        console.error('S3 upload error:', error);
        throw new Error('Failed to upload JSON to S3');
    }
};
