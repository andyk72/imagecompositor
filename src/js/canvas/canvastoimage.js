function convertCanvasToImage(canvasElement, imageFormat) {
    var image_src = canvasElement.toDataURL(imageFormat); // 'image/png'
    window.open(image_src);
}

function konvaConvertCanvasToImage(konvaStage) {
    console.log(konvaStage);
    var dataURL = konvaStage.toDataURL();
    window.open(dataURL);
}

module.exports.convert = convertCanvasToImage;
module.exports.konvaConvert = konvaConvertCanvasToImage;