import Vuex from 'vuex'

// classic mode - deprecated, use module mode instead
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
      ADD_POST(state, post) {
        state.loadedPosts = [...state.loadedPosts, post]
      },
      EDIT_POST(state, editedPost) {
        state.loadedPosts = state.loadedPosts.map(p => {
          if (p.id === editedPost.id) {
            return editedPost
          }
          return p
        })
      }
    },
    actions: {
      // this way nuxt is fetching for the first time, then its loading stuff from store
      async nuxtServerInit(vuexContext, { $axios, error }) {
        try {
          const data = await $axios.$get('/posts.json')
          // eslint-disable-next-line no-console
          console.log('d', data)
          const postsArray = []
          for (const key in data) {
            postsArray.push({ ...data[key], id: key })
          }
          vuexContext.commit('SET_POSTS', postsArray)
        } catch (e) {
          error(e)
        }
      },
      async addPost({ commit }, post) {
        const newPost = await this.$axios.$post('/posts.json', post)
        commit('ADD_POST', { ...post, id: newPost.name })
      },
      async editPost({ commit }, editPost) {
        await this.$axios.$put(`/posts/${editPost.id}.json`, editPost)
        commit('EDIT_POST', editPost)
      },
      setPosts({ commit }, posts) {
        commit('SET_POSTS', posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
