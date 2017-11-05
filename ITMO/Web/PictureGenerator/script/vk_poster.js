var accessGrantedListenerId;

function vkPost() {
    var token = window.localStorage.getItem(VK_API_TOKEN);
    if (token === null) {
        vkRequestAccess();
        clearInterval(accessGrantedListenerId);
        accessGrantedListenerId = setInterval(vkAccessGrantedListener, 1000);
    } else {
        vkGetUploadUrl(token);
    }
}

function vkRequestAccess() {
    const authUrl = "https://oauth.vk.com/authorize?client_id=" + VK_APP_ID + "&display=popup&" +
        "redirect_uri=" + REDIRECT_URL + "&scope=wall,photos&response_type=token";
    window.open(authUrl);
}

function vkAccessGrantedListener() {
    if (window.localStorage.getItem(DO_POST) === "true") {
        clearInterval(accessGrantedListenerId);
        window.localStorage.setItem(DO_POST, false);
        vkGetUploadUrl(window.localStorage.getItem(VK_API_TOKEN));
    }
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

function vkGetUploadUrl(token) {
    $.ajax({
        url: vkRequestUrl("photos.getWallUploadServer", null, token),
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
        success: function (response) {
            console.log("PICTURE POSTED");
            console.log(response);
            alert("Successfully posted");
        },
        error: function () {
            console.log("failed to post photo");
        }
    });
}
