import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import options from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req) {
  await dbConnect();

  if (req.method === 'GET') {
    const session = await getServerSession(options);


    if (!session.user.isAdmin) {
      return new Response(
        JSON.stringify({ success: false, message: 'no session or you are not admin' }),
        { status: 400 }
      );
    }

    // const username = session.user.username;
    // const { status } = await req.json();
 

    try {
 
      const users = await User.find({});
      

      if (!users) {
        return new Response(
          JSON.stringify({ success: false, message: 'no user' }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ success: true, users }),       
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500 }
      );
    }
  }
}