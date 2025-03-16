import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

const Chat = ({ username }) => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    'ws://localhost:8080',
    {
      onOpen: () => console.log('Connected to WebSocket'),
      onClose: () => console.log('Disconnected from WebSocket'),
      shouldReconnect: () => true, // Auto-reconnect on disconnect
    }
  )

  const sendMessage = () => {
    if (text.trim()) {
      sendJsonMessage({ name: username, message: text })
      setText('')
    }
  }

  useEffect(() => {
    console.log
    if (lastJsonMessage) {
      setMessages((prev) => [...prev, lastJsonMessage])
    }
  }, [lastJsonMessage])

  console.log(lastJsonMessage)

  return (
    <div className='bg-neutral-50 flex flex-row h-screen'>
      <div className='bg-gray-700 hidden md:flex md:w-1/5 border-r border-[#ccc]/10 text-white flex flex-col'>
        <h3 className='font-semibold text-[25px] mb-4 mx-4'>List of Users</h3>
        <div className='w-full'>
          {['Ani Josh', 'Tobilola Debowale'].map((name, index) => (
            <h5
              key={index}
              className='text-lg font-semibold text-neutral-300 border-t border-[#ccc]/10 py-1.5 hover:bg-gray-600/50 cursor-pointer px-4'
            >
              {name}
            </h5>
          ))}
        </div>
      </div>
      <div className='w-full h-full bg-gray-800 flex flex-col pb-10'>
        <div className='flex-grow bg-gray-800 p-10 overflow-y-auto'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className='relative bg-gray-700 text-white rounded-lg p-3 max-w-[500px] w-fit mb-4'
            >
              <p>
                <strong>{msg.name}: </strong> {msg.message}
              </p>
              <div className='absolute bottom-1 left-1 transform -translate-x-full translate-y-1/2 w-0 h-0 border-t-8 rotate-90 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-700'></div>
            </div>
          ))}
        </div>
        <div className='w-full mt-5 flex flex-row items-center justify-between gap-5 px-10'>
          <input
            type='text'
            className='w-full p-2 border border-[#ccc] rounded-md text-white/60 placeholder:text-gray-400 flex-grow'
            placeholder='Type Message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-semibold p-2 px-5 rounded-md cursor-pointer'
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
