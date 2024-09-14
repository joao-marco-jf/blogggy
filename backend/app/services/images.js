import { db } from "../database/index.js"

import dotenv from "dotenv"

import { v4 } from "uuid"
import path from "path"

export const uploadImage = async (file) => {
    const fileName = `${v4()}${path.extname(file.originalname)}`

    dotenv.config()

    const {data: image, error} = await db.storage
        .from('images')
        .upload(fileName, file.buffer)

    if(error) {
        console.error('Erro ao fazer upload da imagem:', error);
        return null;
    }

    return `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/images/${image.path}`
}

export const deleteImage = async (fileName) => {
    const {data: image, error} = await db.storage
        .from('images')
        .remove(fileName)

    if(error) return null

    return true
}