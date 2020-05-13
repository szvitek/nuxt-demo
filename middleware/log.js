// this function will be executed befor a given page is loaded
// if it's async return the promise
// runs on server side if it's the first load
// can be added to any page in pages/layout/global
// set up global middleware: nuxt.config.js -> router: { middleware: 'log'}
export default function(context) {
  // eslint-disable-next-line no-console
  console.log('[middleware] log middleware', context)
}
