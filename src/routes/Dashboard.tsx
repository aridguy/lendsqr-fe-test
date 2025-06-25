import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { fetchUsers } from '../services/api'; // adjust the path as needed

function Dashboard () {
const [users, setUsers] = useState([]);
 useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <DashboardLayout>
       <div>
      <h2>User List</h2>
      {users.slice(0,6).map((user: any, index) => (
        <div key={index}>
          <p>{user.maritalStatus}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard
