<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Post {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    author_name: string;
    thumbnail: string;
}

const posts = ref<Post[]>([]);
const loading = ref(true);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        console.log(data.message);

        posts.value = data.data.map((post: any) => ({
            ...post,
            description: post.body
                .match(/<p>(.*?)<\/p>/)?.[1]
                .replace(/<[^>]*>?/gm, '') || '',
        }));
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchPosts);
</script>

<template>
    <main v-if="posts">
        <section class="posts-grid">
            <article class="post" v-for="post in posts" :key="post.id">
                <RouterLink :to="`/posts/${post.id}`">
                    <img class="post-img" :src="post.thumbnail" alt="Thumbnail">
                    <div class="content">
                        <h2>{{ post.title }}</h2>
                        <p>By {{ post.author_name }}</p>
                        <div class="post-body" v-html="post.description"/>
                    </div>
                </RouterLink>
            </article>
        </section>
    </main>
</template>

<style lang="css" scoped>
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    column-gap: 7px;
}

.post {
    position: relative;
}

.post-img {
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
    filter: brightness(40%);
}

.content {
    position: absolute;
    bottom: 7px;
    padding: 50px;
    color: white;
}

.post-body {
    display: -webkit-box;
    line-clamp: 2;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
}
</style>