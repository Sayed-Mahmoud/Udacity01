import sharp from 'sharp';

// Resizing the image if width and height passed as a parameter.
function transform(width: (undefined | string), height: (undefined | string)) {
  if (width != undefined && height != undefined) {
    return sharp().resize(parseInt(width), parseInt(height));
  } else {
    return sharp();
  }
}

export default {
  transform,
};
