import Vuex from 'vuex'
import Cookie from 'js-cookie'

// classic mode - deprecated, use module mode instead
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      firebaseKey: null,
      jwt: null
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
      },
      SET_FIREBASE_KEY(state, env) {
        state.firebaseKey = env.firebaseKey
      },
      SET_JWT(state, token) {
        state.jwt = token
      },
      CLEAR_JWT(state) {
        state.jwt = null
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    actions: {
      // this way nuxt is fetching for the first time, then its loading stuff from store
      async nuxtServerInit(vuexContext, { $axios, error, env }) {
        try {
          const data = await $axios.$get('/posts.json')
          const postsArray = []
          for (const key in data) {
            postsArray.push({ ...data[key], id: key })
          }
          vuexContext.commit('SET_POSTS', postsArray)
          vuexContext.commit('SET_FIREBASE_KEY', env)
        } catch (e) {
          error(e)
        }
      },
      async addPost({ commit, getters }, post) {
        const newPost = await this.$axios.$post(
          `/posts.json?auth=${getters.jwt}`,
          post
        )
        commit('ADD_POST', { ...post, id: newPost.name })
      },
      async editPost({ commit, getters }, editPost) {
        await this.$axios.$put(
          `/posts/${editPost.id}.json?auth=${getters.jwt}`,
          editPost
        )
        commit('EDIT_POST', editPost)
      },
      setPosts({ commit }, posts) {
        commit('SET_POSTS', posts)
      },
      async authenticateUser({ commit, getters }, authData) {
        let url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
        if (!authData.isLogin) {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
        }
        url = `${url}?key=${getters.firebaseKey}`
        const { idToken, expiresIn } = await this.$axios.$post(url, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        const exp = new Date().getTime() + +expiresIn * 1000
        localStorage.setItem('token', idToken)
        localStorage.setItem('tokenExpiration', exp)
        Cookie.set('jwt', idToken)
        Cookie.set('expirationDate', exp)
        commit('SET_JWT', idToken)

        await this.$axios.$post(
          '/api/track-data',
          {
            data: 'authenticated'
          },
          {
            baseURL: ''
          }
        )
      },
      initAuth({ commit }, req) {
        // eslint-disable-next-line no-console
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) return
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          const expirationDateCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))

          if (!jwtCookie || !expirationDateCookie) return
          token = jwtCookie.split('=')[1]
          expirationDate = expirationDateCookie.split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          // eslint-disable-next-line no-console
          console.log('invalid token')
          commit('CLEAR_JWT')
          return
        }
        commit('SET_JWT', token)
      },
      logout({ commit }) {
        commit('CLEAR_JWT')
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      firebaseKey(state) {
        return state.firebaseKey
      },
      jwt(state) {
        return state.jwt
      }
    }
  })
}

export default createStore
