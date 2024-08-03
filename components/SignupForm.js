'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { userSchema } from '../ValidationSchemas/users'; // Adjust the import path as necessary
import { z } from 'zod';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState('not interesting');
  const [isMounted, setIsMounted] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Prepare data for validation
    const userData = {
      Username: username,
      password,
      role: isAdmin ? 'ADMIN' : 'USER',
    };

    // Validate data
    try {
      userSchema.parse(userData);

      // If validation passes, proceed with the API request
      try {
        const response = await axios.post('/api/signup', {
          username,
          password,
          isAdmin,
          status,
        });
        if (response.data.success) {
          router.push('/');
        } else {
          router.push('/bedo2');
          // console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const fieldErrors = {};
        validationError.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  // if (!isMounted) {
  //   return null; // Prevent rendering on the server-side
  // }

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
          {errors.Username && <p className="error">{errors.Username}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          {errors.password && <p className="bg-red-800 text-red-50 rounded-lg border-black p-2">{errors.password}</p>}
        </div>
        {/* <div>
          <label>Admin:</label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not interesting">Not Interesting</option>
          </select>
        </div> */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
