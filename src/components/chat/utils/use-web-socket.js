import { addUniqueByKey } from '@/utils/array-utils'
import { useEffect, useRef, useState } from 'react'
import { createSocket } from './create-socket'

export const useWebSocket = ({ queryId, refetchQuery, token, userId }) => {
  const [socket, setSocket] = useState(null)
  const [typingUsers, setTypingUsers] = useState([])
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    const initializeSocket = async () => {
      const socket = createSocket(token)
      setSocket(socket)

      socket.on('connect', () => {
        console.log('Socket connected')
        refetchQuery()
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      socket.on('*', (eventName, data) => {
        console.log(`Received event: ${eventName}`, data)
      })

      socket.on('server:userJoined', (data) => {
        console.log('server:userJoined')
        refetchQuery()
      })

      socket.on('server:newMessage', (data) => {
        console.log('server:newMessage')
        refetchQuery()
      })

      socket.on('server:userTyping', (data) => {
        setTypingUsers((prevTypingUsers) =>
          addUniqueByKey(prevTypingUsers, data, 'userId'),
        )
      })

      socket.on('server:userStoppedTyping', (data) => {
        const { userId } = data
        setTypingUsers((prevTypingUsers) =>
          prevTypingUsers.filter((user) => user.userId !== userId),
        )
      })

      socket.on('client:joinedRoom', (data) => {
        const { participants: initialParticipants } = data
        setParticipants(initialParticipants)
      })

      socket.emit('client:joinRoom', { queryId, userId })

      return () => {
        console.log('client:leaveRoom')
        socket.emit('client:leaveRoom', {
          queryId,
          userId,
        })
        socket.off('server:newMessage')
        socket.off('server:userJoined')
        socket.off('server:userTyping')
        socket.off('server:userStoppedTyping')
        socket.off('client:joinedRoom')
        socket.off('*')
        socket.disconnect()
      }
    }

    if (token) {
      initializeSocket()
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [token])

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTypingUsers([])
    }, 2000)

    return () => clearTimeout(typingTimeout)
  }, [typingUsers])

  return { socket, typingUsers, participants }
}
