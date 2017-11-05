function getPictureURL() {
    return "http://lorempixel.com/" + PICTURE_WIDTH + "/" + PICTURE_HEIGHT;
}

function generatePicture() {
    var picture = new Image();
    picture.src = getPictureURL();
    picture.onload = function () {
        ctx.drawImage(picture, 0, 0);
        getQuote(addQuote);
    };
}

function addQuote(quote) {
    ctx.font = "24pt Calibri";
    ctx.fillStyle = "red";
    ctx.fillText(quote.quote, 0, PICTURE_HEIGHT * 0.9);
}
