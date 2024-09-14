<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SkeletonPost from './SkeletonPost.vue';

interface Post {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    author_name: string;
    thumbnail: string;
}

const latestPost = ref<Post[]>([]);
const loading = ref(true);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/posts?limit=7');
        const data = await response.json();

        latestPost.value = [{
            ...data.data[0],
            description: data.data[0].body
                .match(/<p>(.*?)<\/p>/)?.[1]
                .replace(/<[^>]*>?/gm, '') || '',
        }];
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchPosts);
</script>

<template>
    <section>
      <article v-if="loading">
        <SkeletonPost />
      </article>
      <article class="latest-post" v-else>
        <RouterLink :to="`/posts/${latestPost[0].id}`">
          <img 
            v-lazy="latestPost[0].thumbnail"
            alt="Thumbnail"
          >
          <div class="content">
            <h2 class="latest-h2">{{ latestPost[0].title }}</h2>
            <p class="latest-p">By {{ latestPost[0].author_name }}</p>
            <div class="post-body latest-body" v-html="latestPost[0].description"/>
          </div>
        </RouterLink>
      </article>
    </section>
</template>

<style lang="css" scoped>
.latest-post {
  position: relative;
}

.latest-post img {
  width: 100%;
  object-fit: cover;
  filter: brightness(40%);
}

.latest-post img {
  aspect-ratio: 16/6;
}

.latest-h2 {
  font-size: 3rem;
  font-weight: 700;
}

.latest-p, .latest-body {
  font-size: 1.2rem;
  font-weight: 400;
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