import React from 'react'
import { Chatbox } from './Chatbox'
import { SearchIcon } from '@heroicons/react/outline'

const Mmiddle = () => {
  return (
    <div className="rounded shadow-lg w-full h-screen border-black border-l-[0.5px]">
      <h3 className='border-black border-b-[0.5px] p-4 font-bold text-xl'>Messaging</h3>
      <div className="flex flex-row">
        <div className="w-1/3 border-black border-r-[0.5px] p-2">
          <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-full">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search Friends"
              className="text-base placeholder:text-base focus:outline-none bg-transparent"
            />
          </div>
          <div className='p-4'>
            Profile Cards
          </div>
        </div>
        <div className="w-[66.67%] p-4 bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]">
          <div className='h-[78vh]'>
            <h3 className='p-4'>Chat Content Goes Here</h3>
          </div>
            <Chatbox />
        </div>
      </div>
    </div>
  )
}

export default Mmiddle
