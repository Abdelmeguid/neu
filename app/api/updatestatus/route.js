import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import options from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(req) {
  await dbConnect();

  if (req.method === 'POST') {
    const session = await getServerSession(options);


    if (!session) {
      return new Response(
        JSON.stringify({ success: false, message: 'no session' }),
        { status: 400 }
      );
    }

    const username = session.user.username;
    const { status } = await req.json();
 

    try {
 
      const user = await User.findOneAndUpdate(
        { username },
        { status },
        { new: true }
      );

      if (!user) {
        return new Response(
          JSON.stringify({ success: false, message: 'no user' }),
          { status: 400 }
        );
      }
      return new Response(
        JSON.stringify({ success: true, message: 'status added sucessfully' }),
        { status: 201 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500 }
      );
    }
  }
}