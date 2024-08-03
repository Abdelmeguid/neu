'use client'
// components/SigninForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default  function StatusPage() {

  const [selectedStatus, setSelectedStatus] = useState('not interesting');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([33,44,77]);



  const router = useRouter();


  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  const updateStatus = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('/api/updatestatus', {
        status: selectedStatus,
      });

      if (response.data.success) {
        setMessage('Status updated successfully!');
        router.push('/thanks'); // Redirect to success page (optional)
      } else {
        setMessage(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.log('Error updating status:', error);
      setMessage('An error occurred while updating the status');
    }
  };
  return (
    <div>

      <h1>Update Your Status</h1>
      <form onSubmit={updateStatus}>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not interesting">Not Interesting</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
      <p> {message}</p>


    </div>
  );
}