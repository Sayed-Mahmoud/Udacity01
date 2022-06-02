import sharp from 'sharp'

// Resizing the image with width and height parameters, then saving it with a new name with size and extension.
async function transform(
    filename: string,
    newfilename: string,
    width: number,
    height: number
): Promise<boolean> {
    try {
        await sharp(filename).resize(width, height).toFile(newfilename)
        return true
    } catch (error) {
        console.log(error)
    }
    return false
}

export default {
    transform,
}
