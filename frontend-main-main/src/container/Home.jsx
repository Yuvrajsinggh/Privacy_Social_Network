import React from 'react'
import SideNav from '../components/Sidebar'
import Middle from '../components/Middle'
import Right from '../components/Right'

const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
        <div className=' w-full h-full flex relative'>
            <SideNav/>
            <Middle />
            <Right />
        </div>
    </div>
  )
}

export default Home