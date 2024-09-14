<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
};
</script>

<template>
    <div class="panel">
        <aside>
            <div class="nav-links">
                <RouterLink to="/p">Home</RouterLink>
                <RouterLink to="/p/posts">Posts</RouterLink>
            </div>
            <button class="logout-button" @click="logout">Logout</button>
        </aside>
        <RouterView />
    </div>
</template>

<style lang="css" scoped>
.panel {
    display: flex;
    width: 100%;
    height: 100vh;
}

aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    height: 100%;
    border-right: 1px solid #ccc;
}

.nav-links {
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.logout-button {
    padding: 10px;
    border: none;
    border-top: 1px solid #ccc;
    background-color: rgb(255, 255, 255);
    color: black;
    cursor: pointer;
}
</style>