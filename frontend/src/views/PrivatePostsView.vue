<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    body: string;
    author_name: string;
    thumbnail: string;
}

const posts = ref<Post[]>([]);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/posts/');
        const data = await response.json();
        console.log(data.message);
        posts.value = data.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

onMounted(fetchPosts);
</script>

<template>
    <main>
        <h1>Private Posts</h1>
        <div>
            <RouterLink to="/p/posts/new">New Post</RouterLink>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.title }}</td>
                    <td>{{ new Date(post.created_at).toDateString() }}</td>
                    <td>{{ post.author_name }}</td>
                    <td>
                        <RouterLink :to="`/p/posts/${post.id}`">View</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-inline: 2rem;
    overflow-y: scroll;
}
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border-bottom: 1px solid rgb(197, 197, 197);
    padding: 1rem;
}

th {
    text-align: left;
    background-color: #f2f2f2;
}
</style>