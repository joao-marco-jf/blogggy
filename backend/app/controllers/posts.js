import { db } from "../database/index.js"
import { deleteImage, uploadImage } from "../services/images.js"

export function allPosts(req, res) {
    const { sort, limit } = req.query;

    db.from('posts')
        .select('*')
        .order('created_at', { ascending: sort === 'asc' || false })
        .limit(+limit || 10)
        .then(({ data, error }) => {
            if (error) {
                return res.status(500).json('Error: ' + error.message);
            }
            res.json({ message: 'Posts found', data });
        })
        .catch(err => res.status(400).json('Error: ' + err.message));
}

export async function createPost(req, res) {
    const { title, author_name, body } = req.body
    const file = req.file

    if(!file) {
        return res.status(400).json({ message: 'No image provided', data: [] })
    }

    try {
        const imageUrl = await uploadImage(file)
    
        if(!imageUrl) {
            return res.status(500).json({ message: 'Error uploading image', data: [] })
        }
    
        const { data, error } = await db
            .from('posts')
            .insert({
                title,
                author_name,
                body,
                thumbnail: imageUrl,
            })
            .select('*')

        if (error) {
            console.error('Database insert error:', error.message);
            return res.status(500).json({ message: 'Error inserting post', data: [] });
        }

        res.status(200).json({ message: 'Post created', data: data });
    } 
    catch (error) {
        console.error('Database insert error:', error.message);
        return res.status(500).json({ message: 'Error inserting post', data: [] });
    }
}

export function getPost(req, res) {
    const { id } = req.params;

    db.from('posts')
        .select('*')
        .eq('id', id)
        .then(({ data, error }) => {
            if (error) {
                return res.status(500).json('Error: ' + error.message);
            }
            res.json({ message: 'Post found', data });
        })
        .catch(err => res.status(400).json('Error: ' + err))
}


export async function deletePost(req, res) {
    const { id } = req.params

    const {data: post, error: postError} = await db.from('posts')
        .select('thumbnail')
        .eq('id', id)
        .single()
    
    if(!post) return res.status(404).json('Post not found')
    if(postError) return res.status(500).json('Error: ' + postError.message)

    const urlArray = post.thumbnail.split('/')
    const fileName = urlArray[urlArray.length - 1]

    await deleteImage(fileName)

    db.from('posts')
        .delete()
        .eq('id', id)
        .then(() => res.status(200).json({message: 'Post deleted', data: []}))
        .catch(err => res.status(400).json('Error: ' + err))
}