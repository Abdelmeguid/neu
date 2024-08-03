// // pages/api/signup.js
// import dbConnect from '../../../lib/mongodb';
// import User from '../../../models/User';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { method } = req;

//   await dbConnect();

//   if (method === 'POST') {
//     const { username, password, isAdmin, status } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ success: false, message: 'Username and password are required' });
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         username,
//         password: hashedPassword,
//         isAdmin: isAdmin || false,
//         status: status || 'not interesting',
//       });

//       await newUser.save();

//       return res.status(201).json({ success: true, message: 'User created successfully' });
//     } catch (error) {
//       return res.status(500).json({ success: false, message: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }


// app/api/signup/route.js
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { username, password, isAdmin, status } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ success: false, message: 'Username and password are required' }),
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      status: status || 'not interesting',
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ success: true, message: 'User created successfully' }),
      { status: 201 }
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
