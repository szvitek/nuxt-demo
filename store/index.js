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
      }
    },
    actions: {
      // this way nuxt is fetching for the first time, then its loading stuff rom store
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          // eslint-disable-next-line nuxt/no-timing-in-fetch-data
          setTimeout(() => {
            vuexContext.commit('SET_POSTS', [
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
            ])
            resolve()
          }, 2000)
        })
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
