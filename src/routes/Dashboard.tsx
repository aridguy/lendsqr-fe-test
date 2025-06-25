import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
}

function Dashboard () {
  const [users, setUsers] = useState<User[]>([]) // 👈 tell TypeScript the type

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/aridguy/users/main/userData.json')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <DashboardLayout>
        {users.slice(1, 6).map(user => (
          <div key={user._id}>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </DashboardLayout>
    </div>
  )
}

export default Dashboard
