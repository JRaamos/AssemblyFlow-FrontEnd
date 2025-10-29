import { useContext, useEffect, useState } from "react";

import { CoreContext } from "context/CoreContext";
import { SOCKET_ENDPOINT } from "services/api";


export default function useSocket(data = {}, callback = () => {}, events = []) {

    const { user } = useContext(CoreContext)

    const [currentSocket, setCurrentSocket] = useState(null)
    const [connected, setConnected] = useState(false)

    const emitBegin = async () => {
        if (connected && currentSocket) {
            currentSocket.emit("begin", { user, ...data })
        }
    }

    useEffect(() => {
        const socket = require("socket.io-client")(SOCKET_ENDPOINT, {
            transports: ["websocket"],
            reconnectionDelay: 10000,
            reconnectionDelayMax: 10000,
            withCredentials: true,
            extraHeaders: {}
        });

        setCurrentSocket(socket)

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
            setConnected(false)
        });

        socket.on("connect", () => {
            setConnected(true)
        });
        
        if(events?.length && typeof callback === 'function'){
            events?.map(event => socket.on(event, (data) => { callback(data) ;}) )
        }

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => { emitBegin() ;}, [connected])

    return {
        connected
    }
}