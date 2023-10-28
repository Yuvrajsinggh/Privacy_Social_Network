import React from 'react'
import SideNav from '../components/Sidebar'
import Mmiddle from '../components/Message/Mmiddle'

const Message = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
        <div className=' w-full h-full flex relative'>
            <SideNav />
            <Mmiddle />
        </div>
    </div>
  )
}

export default Message
