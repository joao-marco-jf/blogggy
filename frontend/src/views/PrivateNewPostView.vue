<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const message = ref('');
const loading = ref(false);

const title = ref<string | undefined>();
const authorName = ref<string | undefined>();
const body = ref<string | undefined>();
const image = ref<File | null>(null);

const preview = ref<string | null>(null);

const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    image.value = target.files?.[0] || null;

    if (image.value) {
        const reader = new FileReader();
        reader.onload = (event) => {
            preview.value = event.target?.result as string;
        };
        reader.readAsDataURL(image.value as Blob);
    }
};

const resetForm = () => {
    title.value = '';
    authorName.value = '';
    body.value = '';
    image.value = null;
    preview.value = null;
};

const handleSubmit = async () => {
    loading.value = true;
    message.value = '';

    if (!title.value || !authorName.value || !body.value || !image.value) {
        message.value = 'Please fill all fields';
        return;
    }

    const formData = new FormData();
    formData.append('thumbnail', image.value);
    formData.append('title', title.value);
    formData.append('body', body.value);
    formData.append('author_name', authorName.value);

    try {
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });
        const data = await response.json();

        if (data.message === 'Unauthorized') {
            message.value = 'Unauthorized';
        } else {
            message.value = 'Post created successfully';
            resetForm();
        }
    } catch (error) {
        console.error('Error:', error);
        message.value = 'Failed to create post';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <main>
        <RouterLink to="/p/posts">Back</RouterLink>
        <h1>New Post</h1>
        <p class="message" v-if="message">{{ message }}</p>
        <form @submit.prevent="handleSubmit">
            <div class="inputs">
                <input
                    v-if="!preview"
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    @change="handleImageChange"
                />
                <img
                    v-else
                    :src="preview"
                    @click="preview = null"
                    alt="Preview"
                    class="preview-image"
                />
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Nova postagem"
                    v-model="title"
                />
                <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    placeholder="John Doe"
                    v-model="authorName"
                />
                <textarea
                    id="body"
                    name="body"
                    placeholder="Insíra o conteúdo da postagem..."
                    v-model="body"
                />
            </div>
            <button type="submit">{{ loading ? "Loading..." : "Submit" }}</button>
        </form>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
}

.message {
    padding: 1rem;
    border: 1px solid #ccc;
}

form {
    display: flex;
    width: fill;
    flex-direction: column;
    gap: 1rem;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input, textarea {
    width: fill;
    padding: 1rem;
    border: 1px solid #ccc;
}

textarea {
    height: 20rem;
    resize: none;
}

button {
    padding: 1rem;
    background-color: #0b75ff;
    font-weight: 700;
    color: white;
    border: none;
    cursor: pointer;
}

.preview-image {
    width: 100%;
    aspect-ratio: 16/2;
    object-fit: cover;
    cursor: pointer;
}
</style>