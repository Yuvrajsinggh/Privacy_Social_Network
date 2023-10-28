import React, { useEffect, useState } from 'react'
import { Switch, Typography } from "@material-tailwind/react";
import axios  from 'axios';

const Security = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const sessionToken = userData ? userData.token : null;

  const handlechange = () => {
    const updatedPrivacyStatus = !isPrivate;
    axios.put('http://127.0.0.1:8000/user/update/', { privacy_status: updatedPrivacyStatus }, {
      headers: {
        Authorization: `Token ${sessionToken}`,
      },
    })
    .then(response => {
      setIsPrivate(updatedPrivacyStatus); 
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

useEffect(() => {
  axios.get('http://127.0.0.1:8000/user/current/', {
    headers: {
      Authorization: `Token ${sessionToken}`,
    },
  })
  .then(response => {
    setIsPrivate(response.data.privacy_status);
  })
  .catch(error => {
    console.error(error);
  });
}, [sessionToken]);
  return (
    <div className='bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] h-[91vh] flex justify-center'>
      <Switch
      id="custom-switch-component"
      ripple={false}
      className="h-full w-full checked:bg-[#2ec946]"
      containerProps={{
        className: "w-11 h-6 -mt-5",
      }}
      label={
        <div>
          <Typography color="blue-gray" className="font-medium text-white">
            Private Account
          </Typography>
          <Typography variant="small" color="gray" className="font-normal text-white">
            By Checking this you ensure that all your posts will be shared to your followers only.
          </Typography>
        </div>
      }
      circleProps={{
        className: "before:hidden left-0.5 border-none",
      }}
      checked={isPrivate}
      onClick={handlechange}
    />
    </div>
  )
}

export default Security
