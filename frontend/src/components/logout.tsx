"use client"
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { handleSignOut } from '../app/actions/auth'

const Logout = () => {
  return (
    <button onClick={()=>handleSignOut()}>
    <LuLogOut   className="text-2xl cursor-pointer text-red-400 hover:text-red-500" />
    </button>
  )
}

export default Logout