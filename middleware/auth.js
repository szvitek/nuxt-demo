export default function({ store, redirect }) {
  // eslint-disable-next-line no-console
  console.log('[Middleware] Auth')
  if (!store.getters.jwt) {
    redirect('/admin/auth')
  }
}
