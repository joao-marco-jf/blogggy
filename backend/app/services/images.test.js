import { deleteImage, uploadImage } from "./images";
import { db } from "../database";

const mockFile = {
    originalname: 'test.jpg',
    buffer: Buffer.from('test')
}

describe('Images Service - Real Supabase Interaction', () => {
    let uploadImagePath = '';

    describe('uploadImage', () => {
        it('Should upload an image to Supabase and return the URL', async () => {
            const imageUrl = await uploadImage(mockFile);
            expect(imageUrl).toContain('https://');
            expect(imageUrl).toContain('/storage/v1/object/public/images/');

            const parts = imageUrl.split('/');
            uploadImagePath = parts[parts.length - 1];
        })
    })

    describe('deleteImage', () => {
        it('Should delete an image from Supabase', async () => {
            const result = await deleteImage(uploadImagePath);
            expect(result).toBe(true);

            const { data: files, error } = await db.storage.from('images').list();

            if (error) throw new Error(error.message);

            const fileNames = files.map(file => file.name);

            expect(fileNames).not.toContain(uploadImagePath);
        })
    })
})