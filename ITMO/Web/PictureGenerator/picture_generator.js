const pictureUrl = "https://placeimg.com/640/480/any";

function getPicture(onPicReceived) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", pictureUrl);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                onPicReceived(this.responseText);
            } else {
                console.log("failed to get picture, status = " + this.status);
            }
        }
    };
    xhr.send();
}
