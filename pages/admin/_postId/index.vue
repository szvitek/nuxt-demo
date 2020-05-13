<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['checkAuth', 'auth'],
  components: {
    AdminPostForm
  },
  async asyncData(context) {
    try {
      const data = await context.$axios.$get(
        `/posts/${context.params.postId}.json`
      )
      return {
        loadedPost: {
          ...data,
          id: context.params.postId
        }
      }
    } catch (err) {
      context.error(err)
    }
  },
  methods: {
    async onSubmit(editPost) {
      try {
        await this.$store.dispatch('editPost', editPost)
        this.$router.push('/admin')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // todo
      }
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
