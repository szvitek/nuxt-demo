<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">{{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post,
        <a href="mailto:info@mynuxtblog.com">send a mail</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    // merge the returned data with the vue data property
    // asyncData can be used only inside PAGES folder
    // 'this' is not available!
    // this code runs on the server if we load this page first
    // then it runs in the browser in spa mode
    // we can access stuff from context (router, store, etc...)
    // fetch is similar but it doesn't merge the data with the vue data

    try {
      const data = await context.$axios.$get(`/posts/${context.params.id}.json`)
      return {
        loadedPost: data
      }
    } catch (err) {
      return context.error(err)
    }
  },
  head() {
    return {
      title: 'A blog post'
    }
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
