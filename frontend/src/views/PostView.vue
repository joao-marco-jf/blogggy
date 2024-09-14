<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

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
const post = ref<Post | null>(null);

const fetchPost = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${route.params.id}`);
        const data = await response.json();
        console.log(data.message);
        post.value = data.data[0];
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchPost);
</script>

<template>
    <article class="post-container" v-if="post">
        <img class="post-thumbnail" :src="post.thumbnail" alt="Thumbnail">
        <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p>By {{ post.author_name }}</p>
            <div class="post-body" v-html="post.body" />
        </div>
    </article>
</template>

<style scoped>
.post-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post-thumbnail {
    width: 100%;
    aspect-ratio: 16/6;
    object-fit: cover;
}

.post-content {
    max-width: 900px;
    text-align: justify;
}
</style>