const picWidth = 640;
const picHeight = 480;

var fileToUpload = document.getElementById("fileToUpload");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", picWidth);
canvas.setAttribute("height", picHeight);

generate();
