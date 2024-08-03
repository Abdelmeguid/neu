import React from 'react'
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import Link from "next/link";

const page = async () => {

  const session = await getServerSession(options);

  // if (session?.user.role !== "ADMIN") {
  //   return <p className="bg-gray-500">Admin access required.</p>;
  // }
  // if (session?.user.role == "ADMIN") {
  //   return <p className="bg-gray-500">you are ADMIN</p>;
  // }

  return (
  
    <div className = " w-1/4 mx-auto mt-6 flex justify-center flex-col bg-blue-800">
      {session?.user.role == "ADMIN" &&<p className="bg-gray-500">you are ADMIN</p>}
      <p className ='text-black font-bold' > page OF Heros</p> 
      <p className ='text-black font-bold bg-yellow-300' > WOLFS OF GHAZA</p> 
   

      {session?.user.isAdmin ? (
    
        <div className='bg-yellow-400'>YOU ARE ADMIN</div>
          
        
        ) : (
          <div>YOU ARE Ordinary User</div>
        )}
      
      {session ? (
        <div>
        <div>we add our opnion here</div>
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        </div>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
    </div>
  )
}

export default page


