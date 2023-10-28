import React, { useState } from 'react'
import { Input, Button } from "@material-tailwind/react";

const Account = () => {
    const [password, setPassword] =useState("");
    const [clicked, setClicked] = useState(false)
    const onChange = ({ target }) => setPassword(target.value);

    const handleSubmit = () => {
        console.log("Deleted");
        setPassword("")
        setClicked(true)
    }
  return (
<div className='h-[90vh] bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]'>
      <h1 className='text-center pt-3 text-xl font-["Lobster"] text-white'>Dear User!</h1>
      <p className='text-sm pt-6 px-3 text-white'>In the digital tapestry of our interconnected world, each account is a unique thread. Your presence has woven a distinctive pattern, and now, if you choose, it's time to gracefully retire your digital tapestry.</p>
      <p className='text-sm pt-3 px-3 text-white'>To proceed with the account deletion, please reconfirm your identity by entering your password. This additional step is designed to guarantee the utmost security of your account. We understand the importance of safeguarding your data and privacy, and this extra layer of verification is our commitment to your online safety.</p>
      <p className='text-sm pt-3 px-3 text-white'>Once your password is confirmed, your account and all associated data will be gracefully retired. This ensures that the process remains in your control, with the utmost respect for your wishes.</p>
      <div className='p-4 flex flex-row justify-center'>
        <Input
        type="password"
        label="Password"
        size='md'
        variant='standard'
        value={password}
        onChange={onChange}
        color='white'
      />
      <Button
        size="md"
        color={password ? "red" : "blue-gray"}
        disabled={!password}
        className="!absoulte -right-2 top-1 rounded text-white"
        ripple={true}
        onClick={handleSubmit}
      >
        Delete
      </Button>
      </div>
      <div className={`${clicked ? '': 'hidden'}`}>
      <p className='pt-3 px-3 text-sm text-white'>Thank you for being a part of our digital community. Your decision to stay or leave is one that we deeply respect, and we're here to support you in every step of your journey.</p>
      <p className='pt-5 px-3 text-sm text-white'>With Warm Regards</p>
      <p className='px-3 text-sm text-white'>Your Company Name</p>
      </div>
    </div>
  )
}

export default Account
