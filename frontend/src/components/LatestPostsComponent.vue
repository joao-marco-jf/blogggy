<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SkeletonPostForGrid from './SkeletonPostForGrid.vue';

interface Post {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    author_name: string;
    thumbnail: string;
}

const latestPosts = ref<Post[]>([]);
const loading = ref(true);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/posts?limit=7');
        const data = await response.json();

        latestPosts.value = data.data.slice(1).map((post: any) => ({
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
    <section v-if="loading" class="posts-grid">
      <article v-for="n in 6" :key="n" >
        <SkeletonPostForGrid />
      </article>
    </section>
    <section v-else class="posts-grid">
      <article class="post" v-for="post in latestPosts" :key="post.id">
        <RouterLink :to="`/posts/${post.id}`">
          <img v-lazy="post.thumbnail" alt="Thumbnail">
          <div class="content">
            <h2>{{ post.title }}</h2>
            <p>By {{ post.author_name }}</p>
            <div class="post-body" v-html="post.description"/>
          </div>
        </RouterLink>
      </article>
      <RouterLink to="/posts">See more</RouterLink>
    </section>
</template>

<style lang="css" scoped>
.post {
  position: relative;
}

.post img {
  width: 100%;
  object-fit: cover;
  filter: brightness(40%);
}

.post img {
  aspect-ratio: 16/10;
}

.content {
  position: absolute;
  bottom: 7px;
  padding: 50px;
  color: white;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  column-gap: 7px;
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