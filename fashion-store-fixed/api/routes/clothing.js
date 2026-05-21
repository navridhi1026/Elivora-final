const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
  const clothingDir = path.join(__dirname, '../public/clothes')
  try {
    const files = fs.readdirSync(clothingDir)
      .filter(f => f.endsWith('.png'))
      .map((filename, index) => ({
        id: index + 1,
        name: filename.replace('.png', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        src: '/clothes/' + filename,
      }))
    return res.json({ status: 'ok', clothes: files })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
})

module.exports = router