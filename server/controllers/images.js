const fs = require('fs')
const path = require('path')

const downloadImg = (req, res) => {
  const name = req.query.id + '.jpeg'
  const dataUrl = req.body.img
  const data = dataUrl.replace('data:image/png;base64,', '')
  fs.writeFileSync(path.resolve(__dirname, '../files', name), data, { encoding: 'base64' })
  res.status(200).json({ message: 'Image uploaded' })
}

const uploadImg = (req, res) => {
  const name = req.query.id + '.jpeg'
  const pathToFile = path.resolve(__dirname, '../files', name)

  console.log({pathToFile, is: fs.existsSync(pathToFile)})
  if (!fs.existsSync(pathToFile)) {
    res.status(200).json({ data: null })
    return
  }
  const dataUrl = fs.readFileSync(pathToFile)
  res.status(200).json({ data: 'data:image/jpeg;base64,' + dataUrl.toString('base64') })
}

module.exports = {
  downloadImg,
  uploadImg
}