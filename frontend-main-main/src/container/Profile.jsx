import {React, useState} from 'react'
import SideNav from '../components/Sidebar'
import Pmiddle from '../components/Profile/Pmiddle'
import PRight from '../components/Profile/Pright'

const Profile = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='w-full h-full flex justify-center items-center relative'>
        <div className='w-full h-full flex relative'>
            <SideNav />
            <Pmiddle selectedUser={selectedUser} />
            <PRight setSelectedUser={setSelectedUser} />
        </div>
    </div>
  )
}

export default Profile