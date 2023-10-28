import React from 'react'
import SideNav from '../components/Sidebar'
import Smiddle from '../components/Settings/Smiddle'

const Settings = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
        <div className='w-full h-full flex relative'>
            <SideNav />
            <Smiddle />
        </div>
    </div>
  )
}

export default Settings
