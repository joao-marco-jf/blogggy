<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const router = useRouter();

const validateForm = () => {
    if (email.value === '' || password.value === '') {
        alert('Please fill in all fields');
        return false;
    }
    return true;
};

const signIn = async () => {
    if (!validateForm()) return;

    try {
        const response = await fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const res = await response.json();

        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            router.push({ name: 'private' });
        }
        
    } catch (error) {
        console.error('Error signing in:', error);
    }
};
</script>

<template>
    <main>
        <div class="form-container">
            <div>
                <h1>Sign In</h1>
                <p>Sign in to access the control panel</p>
            </div>
            <form @submit.prevent="signIn">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="example@email.com">
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required placeholder="********">
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
        <div class="image-container">
            <img src="/image01.jpg" alt="Background Image"/>
        </div>
    </main>
</template>

<style lang="css" scoped>
main {
    display: flex;
    flex-direction: row;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 50%;
}

form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 300px;
}

.input-group {
    display: flex;
    flex-direction: column;
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #1b69fa;
    color: #fff;
    cursor: pointer;
}

.image-container {
    display: flex;
    width: 100%;
    height: 100vh;
}

.image-container img {
    object-fit: cover;
    width: 100%;
}

h1, h2, p {
    width: 300px;
    text-align: left;
    line-height: 1rem;
}
</style>