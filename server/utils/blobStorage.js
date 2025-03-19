import { put, del, list } from '@vercel/blob';
import multer from 'multer';
import { Readable } from 'stream';

// Configure multer for memory storage (not disk storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to convert Buffer to Readable stream
const bufferToStream = (buffer) => {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
};

// Upload a file to Vercel Blob Storage
export async function uploadToBlob(file, folder = 'cats') {
    try {
        const fileName = `${folder}/${Date.now()}-${file.originalname}`;

        const { url, pathname } = await put(fileName, file.buffer, {
        access: 'public',
        contentType: file.mimetype,
        });

        return {
        url,
        pathname,
        success: true
        };
    } catch (error) {
        console.error('Error uploading to Vercel Blob:', error);
        return { error: error.message, success: false };
    }
}

// Delete a file from Vercel Blob Storage
export async function deleteFromBlob(pathname) {
    if (!pathname) return { success: false, message: 'No pathname provided' };

    try {
        await del(pathname);
        return { success: true };
    } catch (error) {
        console.error('Error deleting from Vercel Blob:', error);
        return { success: false, error: error.message };
    }
}

export { upload };