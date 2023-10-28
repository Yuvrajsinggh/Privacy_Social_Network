import React, { useState } from 'react';
import { GrShieldSecurity } from 'react-icons/gr';
import { RiLockPasswordLine } from 'react-icons/ri';
import { VscAccount } from 'react-icons/vsc';
import Security from './Security';
import Password from './Password';
import Account from './Account';

const Smiddle = () => {
  const [selectedTab, setSelectedTab] = useState('Settings');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (selectedTab === 'Security') {
      return <Security/>;
    } else if (selectedTab === 'Password') {
      return <Password/>;
    } else if (selectedTab === 'Account') {
      return <Account/>;
    } else {
      return ;
    }
  };

  return (
    <>
      <div className="rounded shadow-lg w-full h-screen border-black border-l-[0.5px]">
        <h3 className='border-black border-b-[0.5px] p-4 font-bold text-xl'>Setting</h3>
        <div className="flex flex-row">
          <div className="w-1/3 p-5">
            <div
              onClick={() => handleTabClick('Security')}
              className={`border-[orange]  cursor-pointer p-1 flex flex-row shadow-md hover:bg-slate-200 ${
                selectedTab === 'Security' ? 'border-r-[5px]' : ''
              }`}
            >
              <div className='text-[20px] w-8 mt-2'>
                <GrShieldSecurity />
              </div>
              <div className="flex-col">
                <h1>Security</h1>
                <span className='text-xs text-gray-500'>Manage Privacy Control</span>
              </div>
            </div>
            <br />
            <div
              onClick={() => handleTabClick('Password')}
              className={`cursor-pointer p-1 flex flex-row shadow-md hover:bg-slate-200 border-[orange] ${
                selectedTab === 'Password' ? 'border-r-[5px]' : ''
              }`}
            >
              <div className='text-[20px] w-8 mt-2'>
                <RiLockPasswordLine />
              </div>
              <div className="flex-col">
                <h1>Password</h1>
                <span className='text-xs text-gray-500'>Password Reset</span>
              </div>
            </div>
            <br />
            <div
              onClick={() => handleTabClick('Account')}
              className={`cursor-pointer p-1 flex flex-row shadow-md hover:bg-slate-200  border-[orange] ${
                selectedTab === 'Account' ? 'border-r-[5px]' : ''
              }`}
            >
              <div className='text-[20px] w-8 mt-2'>
                <VscAccount />
              </div>
              <div className="flex-col">
                <h1>Account</h1>
                <span className='text-xs text-gray-500'>Delete your Account</span>
              </div>
            </div>
          </div>
          <div className="w-2/3">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Smiddle;
