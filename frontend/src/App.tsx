import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState(["Hello","lhgliuh"])
  const wsRef = useRef()
  const inputRef = useRef<HTMLInputElement>()


  useEffect(()=> {
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (e) => {
      setMessage(m => [...m, e.data])
    }

    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "123"
        }
      }))
    }

    return () => {
      ws.close()
    }

  }, [])

  return (
    <div className='h-screen  bg-black'>
      <br/> <br/> 
      <div className='h-[5vh]'>
      {message.map(message => 
      <div className='flex '>
        <span className='bg-white text-black rounded p-2 m-2'>
          {message} 
        </span> 
      </div>)}
      </div>
        <div className='h-[85vh]'></div>
        <div className='w-full  bg-white flex' >
            <input ref = {inputRef} type="text"  className='flex-1 '/>
            <button onClick={() => {
              const msg = inputRef.current.value
              wsRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                  message: msg
                }
              }))
            }} className='bg-blue-500 text-white p-4  pl-6 pr-6' >Send</button>
        </div>
    </div>
  )
}

export default App
