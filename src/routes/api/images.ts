import express from 'express'
import stream from '../../utilities/fileStream'
import sharper from '../../utilities/sharper'

const routes = express.Router()

routes.get('/images', async (req, res) => {
    const filename = req.query.filename as string
    if (await stream.imageExists(filename)) {
        console.log('filename: ' + filename)
        const width = req.query.width as string
        if (
            width !== undefined &&
            !isNaN(parseInt(width)) &&
            parseInt(width) > 0
        ) {
            console.log('width: ' + width)
            const height = req.query.height as string
            if (
                height !== undefined &&
                !isNaN(parseInt(height)) &&
                parseInt(height) > 0
            ) {
                console.log('height: ' + height)
                const filenameWithSize = filename + '-' + width + '-' + height
                console.log('filenameWithSize: ' + filenameWithSize)

                if (!(await stream.imageExists(filenameWithSize))) {
                    const fullfilename = await stream.resolveImageName(filename)
                    let newfilename = await stream.resolveImageName(
                        filenameWithSize
                    )
                    // get file/image extension
                    newfilename = stream.getFileWithExtension(
                        newfilename,
                        fullfilename
                    )

                    await sharper.transform(
                        fullfilename,
                        newfilename,
                        parseInt(width),
                        parseInt(height)
                    )
                }

                res.set('Content-Type', 'image/webp')
                ;(await stream.getImage(filenameWithSize)).pipe(res)
            } else {
                res.send(`Please enter a correct image height ${height}!`)
            }
        } else {
            res.send(`Please enter a correct image width ${width}!`)
        }
    } else {
        res.send(`Please enter a correct image name ${filename}!`)
    }
})

routes.use('/images', routes)

export default routes
