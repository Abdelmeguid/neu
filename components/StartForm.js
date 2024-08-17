'use client'
// components/SigninForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import globals from "../app/globals.css"

export default function SigninForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', {
        username,
        password,
      });
      if (response.data.success) {
        router.push('/status'); // Adjust the path to your needs
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering on the server-side
  }

  return (
    // <div className="container">
    //   <h1>If you do not have account please <Link href="/signup">
    //     <button>signup</button>
    //   </Link> <div className='mt-3 font-bolder text-xl'>or signin below</div></h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Username:</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Signin</button>
    //   </form>
    // </div>
    <div className="container flex flex-col justify-center" >
      <h1 className='text-3xl font-semibold'>survey system  </h1>
      <h1 className='text-xl font-normal'>If you have account please login </h1>
      <Link href="/api/auth/signin"><button className='text-xl font-normal'>sign in</button></Link>
      <h1 className='text-xl font-normal mt-4'>or sign up </h1>
      <Link href="/signup">
         <button className='text-xl font-normal'>sign up</button>
       </Link>
    </div>
  );
}
