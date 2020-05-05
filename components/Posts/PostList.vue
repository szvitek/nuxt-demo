<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      v-bind="post"
      :isAdmin="isAdmin"
    />
  </section>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      posts: [
        {
          id: '1',
          thumbnail:
            'https://hypertechx.com/wp-content/uploads/2017/10/gettyimages-186450097.jpg',
          title: 'Hello world!',
          previewText: 'first post preview'
        },
        {
          id: '2',
          thumbnail:
            'https://hypertechx.com/wp-content/uploads/2017/10/gettyimages-186450097.jpg',
          title: 'Hello world! 2',
          previewText: 'second post preview'
        },
        {
          id: '3',
          thumbnail:
            'https://hypertechx.com/wp-content/uploads/2017/10/gettyimages-186450097.jpg',
          title: 'Hello world! 3',
          previewText: 'third post preview'
        }
      ]
    }
  }
}
</script>

<style>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
