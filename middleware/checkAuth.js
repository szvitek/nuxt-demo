export default function({ store, req }) {
  // eslint-disable-next-line no-console
  console.log('[Middleware] Check Auth')
  store.dispatch('initAuth', req)
}
