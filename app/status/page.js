
import React from 'react';
import AddStatus from '../../components/AddStatus';
import Admin from '../../components/Admin';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);

  return (
    <div>

{session?.user.isAdmin ? (
    <div>
    {/* <div className='bg-yellow-400'>YOU ARE ADMIN</div> */}
    <Admin/>
    </div> 
    
    ) : (
      
      <AddStatus/>
    )}
      </div>
  )
}

export default page