<template>
    <div class="skeleton-post">
        <div class="skeleton-img"></div>
        <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-author"></div>
            <div>
                <div class="skeleton-body"></div>
                <div style="width: 80%;" class="skeleton-body"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.skeleton-post {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  background-color: #e0e0e0;
  margin-bottom: 7px;
}

.skeleton-img {
  width: 100%;
  height: 60%;
  background-color: #e0e0e0;
}

.skeleton-content {
    position: absolute;
    bottom: 0;
    padding: 50px;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skeleton-title,
.skeleton-author,
.skeleton-body {
  background-color: #ccc;
  margin-bottom: 0.5rem;
}

.skeleton-title {
  height: 30px;
  width: 70%;
}

.skeleton-author {
  height: 15px;
  width: 10%;
}

.skeleton-body {
  height: 10px;
  width: 90%;
}
</style>