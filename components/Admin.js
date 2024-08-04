'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls
import globals from "../app/globals.css"
import PieChart from './PieChart';



function Admin() {
  const [users, setUsers] = useState([33,44,77]);
  const [error, setError] = useState();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace with your API endpoint
      
        if(response){
          console.log(response.data.users);
          
          setUsers(response.data.users);}
          console.log(users);
        
       
         
        

      } catch (error) {
        console.error('Error fetching users:', error);
        
        
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('Updated users:', users);
  }, [users]);

  return (
    // <div className="p-4">
    //   {error && <p className="text-red-500">Error: {error}</p>}
    //   <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
    //     <thead className="bg-gray-50">
    //       <tr>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Username</th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Status</th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {users.map((user) => (
    //         <tr key={user._id}>
    //           <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.username}</td>
    //           <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{user.status}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    /////////////////////////////////////////////

    <div  >
      
      <h1 className='x-auto mt-3 text-3xl font-semibold'>Admin Page</h1>
      <div  className='flex flex-row items-center justify-start gap-12'>
      <table className="userTable " style={{marginLeft:"1%",marginTop:"0%"}}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="tableRow">
              <td>{user.username}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-1/3'>
      <PieChart data={users} />
      </div>
      </div>
    </div>
  );
}

export default Admin;