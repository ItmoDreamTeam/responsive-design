function rootApiUrl() {
    return "http://46.101.92.178:8080";
}

function upload() {
    var username = "AwesomePictures";
    var password = "123456";

    var formData = new FormData();
    formData.append("file", fileToUpload.files[0]);

    $.ajax({
        url: rootApiUrl() + "/user/" + username + "/file",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            alert("Successfully uploaded");
        }
    });
}

function createUser(username, password) {
    $.ajax({
        url: rootApiUrl() + "/signup?username=" + username + "&password=" + password,
        method: "POST",
        success: function (response) {
            console.log("User created. " + response);
        }
    });
}
