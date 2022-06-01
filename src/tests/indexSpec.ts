import stream from '../utilities/fileStream'
import sharper from '../utilities/sharper'
import fileMan from 'fs'

describe('Tests for file-stream utilities', () => {
    it("should add '.jpg' extension and path separates", async () => {
        expect(await stream.resolveImageName('encenadaport')).toBe(
            './images/full/encenadaport.jpg'
        )
    })
    it('should check for image if exists and be truthy', async () => {
        expect(await stream.imageExists('fjord')).toBeTruthy()
    })
    it('should resolve path and gets the image readable to be truthy ', async () => {
        expect((await stream.getImage('fjord')).readable).toBeTruthy()
    })

    it('should create image santamonica with 250 * 250 px and second time deleting it', async () => {
        if (!(await stream.imageExists('santamonica-250-250'))) {
            expect(
                await sharper.transform(
                    await stream.resolveImageName('santamonica'),
                    './images/full/santamonica-250-250.jpg',
                    300,
                    300
                )
            ).toBeTruthy()
            console.log('Image should be created.')
        } else {
            await fileMan.unlinkSync(
                await fileMan.realpathSync(
                    './images/full/santamonica-250-250.jpg'
                )
            )
            console.log('Image should be deleted.')
        }
    })
})
