//import "./style.css";

import Scene from "./core/scene";
import Player from "./data/player";


document.addEventListener('DOMContentLoaded', (_) => {
    const sc = new Scene();
    sc.setup();

    let socket = new WebSocket("ws://ravla.org:3000");
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        socket.send("My name is John");
    };
    socket.onmessage = function(event) {
        //console.log(`[message] Data received from server: ${event}`);

        let data = JSON.parse(event.data);
        sc.onEvent(data.type, new Player(data.data.uuid, data.data.name, data.data.x, data.data.y, data.data.z, data.data.yaw))
    };
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    };
    socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
    };
});

