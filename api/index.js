const express = require('express')
const app = express()

// if your project is more focused on backend then use express template
// when generating a brand new nuxt.js projext

app.post('/track-data', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('stored data', req.body.data)
  res.json({
    message: 'success'
  })
})

module.exports = {
  path: '/api',
  handler: app
}
