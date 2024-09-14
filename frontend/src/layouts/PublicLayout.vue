<template>
    <header>
        <RouterLink to="/">
            <img src="/logo.png" alt="Blogggy Logo" class="logo" />
        </RouterLink>
    </header>

    <div class="content">
        <RouterView />
    </div>

    <footer>
        <RouterLink to="/">
            <img src="/logo.png" alt="Blogggy Logo" class="footer-logo" />
        </RouterLink>
        <div class="divider"></div>
        <p class="footer-text">Todos os direitos reservados &copy; 2024 Blogggy</p>
    </footer>
</template>

<style lang="css" scoped>
main {
    display: flex;
    flex-direction: column;
}

header {
    display: flex;
    justify-content: center;
    padding: 15px;
}

.logo {
    width: 100px;
}

.content {
    padding: 1rem;
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 50px;
    gap: 15px;
}

.footer-logo {
    width: 100px;
    height: 80px;
    object-fit: contain;
}

.divider {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #ccc;
}

.footer-text {
    color: #aaa;
    font-weight: 300;
}
</style>