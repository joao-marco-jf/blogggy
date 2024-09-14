<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Post {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    body: string;
    author_name: string;
    thumbnail: string;
}

const route = useRoute();
const router = useRouter();

const post = ref<Post | null>(null);

const fetchPost = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${route.params.id}`);
        const data = await response.json();
        console.log(data.message);
        post.value = data.data[0];
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

const deletePost = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${route.params.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data.message);
        post.value = null;
        router.push('/p/posts');
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

onMounted(fetchPost);
</script>

<template>
    <main>
        <RouterLink to="/p/posts">Back</RouterLink>
        <h1>Private Post</h1>

        <article v-if="post">
            <button @click="deletePost">Delete</button>
            <img class="post-thumbnail" :src="post.thumbnail" alt="Thumbnail">
            <div class="post-content">
                <h2>{{ post.title }}</h2>
                <p>By {{ post.author_name }}</p>
                <div class="post-body" v-html="post.body" />
            </div>
        </article>
        <p v-else>Loading...</p>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    width: fill;
    padding: 1rem;
    overflow-y: scroll;
}

.post-thumbnail {
    width: 100%;
    aspect-ratio: 16/6;
    object-fit: cover;
}

.post-content {
    max-width: 800px;
    margin: 0 auto;
}

.post-body {
    text-align: justify;
    line-height: 1.8rem;
}
</style>