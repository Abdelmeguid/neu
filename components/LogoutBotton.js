import React from 'react'
import Link from "next/link";

function LogoutBotton() {
  return (
    <div className= "bg-zinc-500 w-full mt-0 p-5">
         
          <Link className="mr-1 bg-yellow-300 rounded-lg p-4 text-xl font-medium" href="/api/auth/signout?callbackUrl=/">Logout</Link>
       
    </div>
  )
}

export default LogoutBotton