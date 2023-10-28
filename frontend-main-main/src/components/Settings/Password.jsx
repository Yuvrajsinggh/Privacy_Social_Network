import React, { useState } from 'react'
import { Input, Button } from "@material-tailwind/react";

const Password = () => {
    const [email, setEmail] =useState("");
    const [clicked, setClicked] = useState(false)
    const onChange = ({ target }) => setEmail(target.value);

    const handleSubmit = () => {
        console.log("Submitted");
        setEmail("")
        setClicked(true)
    }

  return (
    <div className='bg-slate-200 h-[90vh] bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]'>
      <h1 className='text-center pt-3 text-xl font-["Lobster"] text-white'>Dear User!</h1>
      <p className='text-sm pt-6 px-3 text-white'>In the realm of digital security, even the mightiest of passwords need an occasional refresh. Fear not, for your account's safeguard is our utmost priority.</p>
      <p className='text-sm pt-3 px-3 text-white'>With a flick of the cyberwand, your old password will fade into obscurity, making way for a fresh, formidable passphrase that's uniquely yours. Prepare to forge a new key to your digital kingdom</p>
      <div className='p-4 flex flex-row justify-center'>
        <Input
        type="email"
        label="Email Address"
        size='md'
        variant='standard'
        value={email}
        onChange={onChange}
        color='white'
      />
      <Button
        size="md"
        color={email ? "gray" : "blue-gray"}
        disabled={!email}
        className="!absoulte -right-2 top-1 rounded"
        ripple={true}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      </div>
      <div className={`${clicked ? '': 'hidden'}`}>
      <p className='pt-3 px-3 text-sm text-white'>Our magical servers are now crafting a secure link that will whisk you away to the land of password renewal. Within this enchanted email, you'll find the portal to reset your password and ensure the protection of your cherished account.</p>
      <p className='pt-5 px-3 text-sm text-white'>Yours in digital defense</p>
      <p className='px-3 text-sm text-white'>Your Company Name</p>
      </div>
    </div>
  )
}

export default Password
