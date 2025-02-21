import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket,
    room: string
}

let allsocket: User[] = []

wss.on("connection", function(socket) {

    socket.on("message", (e) => {
        const parsedMessage = JSON.parse(e as unknown as string)

        if(parsedMessage.type === "join") {
            allsocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if( parsedMessage.type === "chat" ) {
            let currentUserRoom = null;
            for ( let i = 0; i < allsocket.length; i++){
                if ( allsocket[i].socket == socket){
                    currentUserRoom = allsocket[i].room
                }
            }

            for (let i = 0; i < allsocket.length; i++) {
                if( allsocket[i].room == currentUserRoom){
                    allsocket[i].socket.send(parsedMessage.payload.message)
                }
            }
        }
    })
    
 
})