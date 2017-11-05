function postToVK() {
    //var token = vkGetToken();
    var token = "";
    vkGetUploadUrl(token);
}

function checkIfRedirected() {
    //var url = window.location.href;
    var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("c");
    console.log(c);
}

function vkRequestUrl(method, params, token) {
    var url = "https://api.vk.com/method/" + method;
    if (params !== null || token !== null)
        url += "?";
    if (params !== null)
        url += params;
    if (params !== null && token !== null)
        url += "&";
    if (token !== null)
        url += "access_token=" + token;
    return url;
}

function vkGetToken() {
    // const authUrl = "https://oauth.vk.com/authorize?client_id=6247308&display=popup&" +
    //     "redirect_uri=https://oauth.vk.com/blank.html&scope=wall,photos&response_type=token";
    const authUrl = "https://oauth.vk.com/authorize?client_id=6247308&display=popup&" +
        "redirect_uri=http://localhost:63343/Web/ITMO/Web/PictureGenerator/index.html&scope=wall,photos&response_type=token";
    //window.open(authUrl);
    window.location.href = authUrl;
    console.log(window.location.href);
    //return "d313dd99fd90a2c897fef65609194762a73c3c6d6acd457b26b18365c133ef44d2e99a68d4e97c08a319c";
}

function vkGetUploadUrl(token) {
    $.ajax({
        url: vkRequestUrl("photos.getWallUploadServer", null, null),
        method: "GET",
        success: function (response) {
            console.log(response);
            vkUploadPicture(response.response.upload_url, token);
        },
        error: function () {
            console.log("failed to get upload url");
        }
    });
}

function vkUploadPicture(uploadUrl, token) {
    console.log("uploading picture");

    var formData = new FormData();
    formData.append("photo", fileToUpload.files[0]);

    $.ajax({
        url: uploadUrl,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            var responseDeserialized = JSON.parse(response);
            vkSavePicture(responseDeserialized.photo, responseDeserialized.server, responseDeserialized.hash, token);
        },
        error: function () {
            console.log("failed to upload photo");
        }
    });
}

function vkSavePicture(photo, server, hash, token) {
    console.log("saving picture");

    $.ajax({
        url: vkRequestUrl("photos.saveWallPhoto", "photo=" + photo + "&server=" + server + "&hash=" + hash, token),
        method: "POST",
        success: function (response) {
            console.log(response);
            vkPostPicture(response.response[0].owner_id, response.response[0].id, token);
        },
        error: function () {
            console.log("failed to save photo");
        }
    });
}

function vkPostPicture(ownerId, picId, token) {
    console.log("posting picture");

    $.ajax({
        url: vkRequestUrl("wall.post", "owner_id=" + ownerId + "&attachments=" + picId, token),
        method: "POST",
        success: function () {
            console.log("PICTURE POSTED");
        },
        error: function () {
            console.log("failed to post photo");
        }
    });
}
