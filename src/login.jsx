import React, { useState } from 'react'
import Chat from './chat'

const Login = () => {
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const login = (e) => {
    e.preventDefault()
    if (username) {
      setLoggedIn(true)
    }
  }

  return (
    <>
      {!loggedIn ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <form className='shadow-md rounded-md w-full max-w-[500px] max-h-fit p-10 mx-aut'>
            <h1 className='text-center font-bold text-[25px]'>Login</h1>
            <div className='w-full mt-5 space-y-5 flex flex-col justify-center'>
              <input
                type='text'
                className='w-full max-w-[500px] p-2 border border-[#ccc] rounded-md text-black placeholder:text-gray-400'
                placeholder='Enter Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-semibold p-2.5 px-10 rounded-md cursor-pointer'
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </>
  )
}

export default Login
