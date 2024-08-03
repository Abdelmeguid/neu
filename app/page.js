import React from 'react'
import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import AddStatus from '../components/AddStatus';
import Admin from '../components/Admin';
import LogoutBotton from "../components/LogoutBotton"


// pages/signup.js
import StartForm from '../components/StartForm';

const signin = async () => {
  const session = await getServerSession(options);
  console.log(session?.user.isAdmin);
  console.log(session);
  if (session){
    console.log("we have session")
  }
  else
  { console.log("NOOO session")}
     
    
 
  return (
    <div>
      {!session ? (
        <StartForm />
      ) : !session.user.isAdmin ? (
        <>
        <LogoutBotton/>
        <AddStatus />
        </>
      ) : (
        <>
        <LogoutBotton/>
        <Admin />
        </>
      )}
    </div>
  );
};

export default signin;

// const page = async () => {
//   const session = await getServerSession(options);
//   console.log(session?.user.isAdmin);
//   return (
//     <div>
//     <div>Hii our Command </div>
//    {session?(<p className="bg-gray-500">there is session </p>):(<p className="bg-blue-500">there is NO session </p> )}
//     {session?.user.isAdmin ?(<p className="bg-gray-500">you are ADMIN</p>):(<p className="bg-gray-500">you are Not ADMIN</p>) }

//     {session ? (
//           <Link href="./api/auth/signout?callbackUrl=/">Logout</Link>
//         ) : (
//           <Link href="./api/auth/signin">Login</Link>
//         )}
//     </div>
//   )
// }
// export default page;

