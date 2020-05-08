<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">
      Thumbnail Link
    </AppControlInput>
    <AppControlInput v-model="editedPost.content" control-type="textarea">
      Content
    </AppControlInput>
    <AppControlInput v-model="editedPost.previewText" control-type="textarea">
      Preview Text
    </AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      @click="onCancel"
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      >Cancel</AppButton
    >
  </form>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'

export default {
  components: {
    AppButton,
    AppControlInput
  },
  props: {
    post: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnail: '',
            content: '',
            previewText: ''
          }
    }
  },
  methods: {
    onSave() {
      this.$emit('submit', { ...this.editedPost, updatedDate: new Date() })
    },
    onCancel() {
      this.$router.push('/admin')
    }
  }
}
</script>
