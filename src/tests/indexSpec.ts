import stream from '../utilities/fileStream';

describe('Tests for file-stream utilities', () => {
    it('should add \'.jpg\' extension and path separates', async () => {
        expect(await stream.resolveImageName('encenadaport')).toBe('./images/full/encenadaport.jpg');
    });
    it('should check for image if exists and be truthy', async () => {
        expect(await stream.imageExists('fjord')).toBeTruthy();
    });
    it('should resolve path and gets the image readable to be truthy ', async () => {
        expect((await stream.getImage('fjord')).readable).toBeTruthy();
    });
});