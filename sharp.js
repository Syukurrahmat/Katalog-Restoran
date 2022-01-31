const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const target = path.resolve(__dirname, 'src/public/assets/images/heros')

const size = {
    small: 480
}

fs.readdirSync(target).forEach(image => {
    const fileExt = path.extname(image)
    const fileName = path.basename(image, fileExt)

    Object.keys(size).forEach(sizeName => {
        if (fileName.endsWith('-' + sizeName)) {
            console.log('\x1b[32m', `✓\t${image} sudah di-resize`)
            return
        }

        sharp(`${target}/${image}`)
            .resize(size[sizeName])
            .jpeg({ mozjpeg: true })
            .toFile(path.resolve(__dirname, `${target}/${fileName}-${sizeName}${fileExt}`))
            .then(() => {
                console.log('\x1b[32m', `✓\t${image} berhasil di-resize ke ukuran ${sizeName}`, '\x1b[0m')
            })
    })
})
