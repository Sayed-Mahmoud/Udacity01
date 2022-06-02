import fileMan from 'fs'

//
function endsWithAny(suffixes: string[], filename: string) {
    return suffixes.some(function (suffix) {
        return filename.endsWith(suffix)
    })
}

// add the path and image extension '.jpg' if not exists.
async function resolveImageName(filename: string): Promise<string> {
    const imageTypes: string[] = ['.jpg', '.jpeg', '.png', '.gif']
    filename = './images/full/' + filename
    if (endsWithAny(imageTypes, filename)) {
        return filename
    }

    for (let i = 0; i < imageTypes.length; i++) {
        if (await fileMan.existsSync(filename + imageTypes[i])) {
            return filename + imageTypes[i]
        }
    }
    return filename
}

// Checking if the image file has exists or not found.
async function imageExists(filename: string): Promise<boolean> {
    const imageName: string = await resolveImageName(filename)
    return await fileMan.existsSync(imageName)
}

// Getting the image buffer after path checked.
async function getImage(filename: string): Promise<fileMan.ReadStream> {
    return await fileMan.createReadStream(
        await resolveImageName(filename as string)
    )
}

function getFileWithExtension(filename: string, extension: string) {
    return filename + '.' + extension.split('.').pop()
}

export default {
    imageExists,
    getImage,
    resolveImageName,
    getFileWithExtension,
}
