import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiHouse } from 'react-icons/pi';
import { AiOutlineMessage } from 'react-icons/ai';
import { TfiUser } from 'react-icons/tfi';
import { IoSettingsOutline } from 'react-icons/io5';
import { SlLogout } from 'react-icons/sl';
import { RxTwitterLogo } from 'react-icons/rx';
import CreatePostPopup from '../utils/CreatePostPopup';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const SideNav = () => {
    const navigate = useNavigate("")
    const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const sessionToken = userData ? userData.token : null;
        
    
        axios.post('http://127.0.0.1:8000/user/logout/', null, {
            headers: {
                Authorization: `Token ${sessionToken}`,
            },
        })
        .then((response) => {
            console.log('Logged out:', response.data);
            navigate("/login")
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    }

    const openCreatePostPopup = () => {
        setIsCreatePostPopupOpen(true);
    };

    const closeCreatePostPopup = () => {
        setIsCreatePostPopupOpen(false);
    };

    const handleCreatePost = (postText) => {
        console.log('Creating a new post with text:', postText);
        closeCreatePostPopup();
    };

    const NAVIGATION_ITEMS = [
        {
            title: 'Twitter',
            icon: RxTwitterLogo,
        },
        {
            title: 'Home',
            icon: PiHouse,
        },
        {
            title: 'Message',
            icon: AiOutlineMessage,
        },
        {
            title: 'Profile',
            icon: TfiUser,
        },
        {
            title: 'Settings',
            icon: IoSettingsOutline,
        },
        {
            title: 'Log Out',
            icon: SlLogout,
            onClick: handleLogout,
        },
    ];

    return (
        <>
            <section className='w-fit h-100vh p-6 flex flex-col space-y-4 bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-[#fff]'>
                {NAVIGATION_ITEMS.map((item) => (
                    <React.Fragment key={item.title}>
                        {item.title === 'Log Out' ? (
                            <button
                                className="hover:bg-black/10 transition text-xl duration-200 rounded-3xl py-2 px-6 flex items-center justify-start w-fit space-x-2"
                                onClick={item.onClick}
                            >
                                <div>
                                    <item.icon />
                                </div>
                                <div>{item.title}</div>
                            </button>
                        ) : (
                            <Link
                                to={`/${item.title.toLowerCase()}`}
                                className={`hover-bg-black/10 transition text-xl duration-200 rounded-3xl py-2 px-6 flex items-center justify-start w-fit space-x-2 ${
                                    location.pathname.includes(item.title.toLowerCase()) ? 'font-bold' : ''
                                }`}
                            >
                                <div>
                                    <item.icon />
                                </div>
                                {item.title !== 'Twitter' && <div>{item.title}</div>}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
                <button
                    className='border border-white text-white bg-transparent hover:bg-white hover:text-red-500 text-xl m-2 p-2 rounded-full transform hover-scale-95 transition duration-80 focus-outline-none'
                    onClick={openCreatePostPopup}
                >
                    Create
                </button>
            </section>
            {isCreatePostPopupOpen && (
                <CreatePostPopup
                    isOpen={isCreatePostPopupOpen}
                    onClose={closeCreatePostPopup}
                    onCreatePost={handleCreatePost}
                />
            )}
        </>
    );
};

export default SideNav;
