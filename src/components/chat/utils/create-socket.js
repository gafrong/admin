import { io } from 'socket.io-client'

export const createSocket = (token) => {
  if (!token) {
    throw new Error('No authentication token available')
  }

  const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
    auth: {
      token,
    },
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  })

  return socket
}
