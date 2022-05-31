import express from 'express';
import stream from '../../utilities/fileStream';
import sharper from '../../utilities/sharper';

const routes = express.Router();

routes.get('/images', async (req, res) => {
    const filename = req.query['filename'] as (string | undefined);
    if (await stream.imageExists(filename)) {
        const width = req.query['width'] as string;
        const height = req.query['height'] as string;
        const transform = sharper.transform(width, height);
        res.set('Content-Type', `image/webp`);
        (await stream.getImage(filename as string)).pipe(transform).pipe(res);
    }
    else {
        res.send(`Please enter a correct image name ${filename}!`);
    }
});

routes.use('/images', routes);

export default routes;
