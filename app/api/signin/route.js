// // pages/api/signin.js
// import dbConnect from '../../../lib/mongodb';
// import User from '../../../models/User';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { method } = req;

//   await dbConnect();

//   if (method === 'POST') {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ success: false, message: 'Username and password are required' });
//     }

//     try {
//       const user = await User.findOne({ username });

//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ success: false, message: 'Invalid credentials' });
//       }

//       return res.status(200).json({ success: true, message: 'Signin successful' });
//     } catch (error) {
//       return res.status(500).json({ success: false, message: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// app/api/signin/route.js
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ success: false, message: 'Username and password are required' }),
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Signin successful' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return new Response(
    JSON.stringify({ message: 'GET method is not supported for this endpoint' }),
    { status: 405 }
  );
}

