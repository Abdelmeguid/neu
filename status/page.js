
import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';

export default function StatusPage() {
  // const { data: session, status } = useSession();
  // const [selectedStatus, setSelectedStatus] = useState('not interesting');
  // const [message, setMessage] = useState('');

  // const handleStatusChange = async (e) => {
  //   e.preventDefault();

  //   if (status === 'loading') {
  //     setMessage('Loading session...');
  //     return;
  //   }

  //   if (!session) {
  //     setMessage('You must be signed in to update your status.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('/api/update-status', { status: selectedStatus });
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage('An error occurred while updating the status');
  //   }
  // };

  return (
    <div>
      we are okkk
      {/* <h1>Update Your Status</h1>
      <form onSubmit={handleStatusChange}>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not interesting">Not Interesting</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>} */}
    </div>
  );
}
