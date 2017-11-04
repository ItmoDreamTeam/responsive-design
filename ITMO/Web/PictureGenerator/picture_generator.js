function getPictureURL(width, height) {
    return "http://lorempixel.com/" + width + "/" + height;
}

function generate() {
    var picture = new Image();
    picture.src = getPictureURL(picWidth, picHeight);
    picture.onload = function () {
        ctx.drawImage(picture, 0, 0);
        getQuote(onQuoteReceived);
    };
}

function onQuoteReceived(quote) {
    ctx.font = "24pt Calibri";
    ctx.fillStyle = "red";
    ctx.fillText(quote.quote, 0, picHeight * 0.9);
}
