const socket = io();
const video = document.querySelector("#sync-video");

video.onpause = (event) => socket.emit("pause", event);
video.onplay = (event) => socket.emit("play", event);
video.onseeked = (event) => socket.emit("seek", video);
video.onseeking = (event) => socket.emit("seeking", event);

socket.on("play", (data) => video.play());
socket.on("pause", (data) => video.pause());
socket.on("seek", (data) => console.log(data));
// socket.on("seeking", (data) => console.log(data));
