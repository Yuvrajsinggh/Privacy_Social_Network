import React from 'react'

const Rune = ({Icon, color}) => {
  return (
    <div
      className={`${color} w-9 h-9 p-2 rounded-full hover-transition cursor-pointer`}>
      {Icon}
    </div>
  )
}

export default Rune
