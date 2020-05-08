<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    async onSubmit(postData) {
      // $axios.get() returns the response object
      // $axios.$get() return the data from the response

      try {
        // const newPost = await this.$axios.$post('/posts.json', postData)
        await this.$store.dispatch('addPost', postData)
        // eslint-disable-next-line no-console
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
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
