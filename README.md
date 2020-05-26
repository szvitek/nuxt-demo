# nuxt-tutorial

> My superior Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## deployment

### universal mode

run `npm run build` -> generates `.nuxt` folder
run `npm start` -> start server in prod mode

### spa mode

run `npm run build` -> generates `dist` folder
deploy dist to your server
! make sure all requests forwarded to index.html
! can't user `nuxtServerInit` in your store in spa mode

### static mode

use the universal mode in nuxt.config
run `npm run generate` command -> generates dist folder
deploy dist to your host
! When generating your web application with nuxt generate, the context given to asyncData and fetch will not have req and res.
! If you have a project with dynamic routes, take a look at the generate configuration to tell Nuxt.js how to generate these dynamic routes.
