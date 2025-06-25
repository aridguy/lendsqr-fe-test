import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { fetchUsers } from '../services/api' // adjust the path as needed
import UsersIcon from '../Asset/users.png'
import ActiveUsers from '../Asset/active-users.png'
import UsersWithLoan from '../Asset/users-with-loan.png'
import UsersWithOutLoan from '../Asset/users-with-savings.png'

interface UserDatas {
  username: string
  email: string
  phone: string
  hasLoan: boolean
  hasSavings: boolean
  createdAt: string // assuming this is a date string
  dateJoined: string
  updatedAt?: string // optional, if not always present
  status: 'Active' | 'Inactive' | 'Pending' // adjust to match your statuses
}

function Dashboard () {
  const [dashboardUi, setDashboardUi] = useState(true)
  const [users, setUsers] = useState<UserDatas[]>([])

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err))
    setDashboardUi(true)
  }, [])

  // Calculate statistics from users data
  const activeUsersCount = users.filter(user => user.status === 'Active').length
  const usersWithLoanCount = users.filter(user => user.hasLoan).length
  const usersWithSavingsCount = users.filter(user => user.hasSavings).length

  return (
    <div>
      <DashboardLayout>
        {dashboardUi && (
          <div className='container total-users mt-4'>
            {/* Title */}
            <div className='row mb-3 title-total-users'>
              <div className='col-12'>
                <h4>Users</h4>
              </div>
            </div>
            {/* User boxes */}
            <div className='row total-users-row g-3'>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm text-start'>
                  <img src={UsersIcon} alt='users icon' className='mb-2' />{' '}
                  <br />
                  <small className='text-uppercase fw-bold'>Users</small>
                  <h3 className='totalCount mt-2'>{users.length}</h3>
                </div>
              </div>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm'>
                  <img src={ActiveUsers} alt='users icon' className='mb-2' />{' '}
                  <br />
                  <small className='text-uppercase fw-bold'>Active users</small>
                  <h3 className='totalCount mt-2'>{activeUsersCount}</h3>
                </div>
              </div>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm'>
                  <img src={UsersWithLoan} alt='users icon' className='mb-2' />{' '}
                  <br />
                  <small className='text-uppercase fw-bold'>
                    users with loan
                  </small>
                  <h3 className='totalCount mt-2'>{usersWithLoanCount}</h3>
                </div>
              </div>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm'>
                  <img
                    src={UsersWithOutLoan}
                    alt='users icon'
                    className='mb-2'
                  />{' '}
                  <br />
                  <small className='text-uppercase fw-bold'>
                    users with savings
                  </small>
                  <h3 className='totalCount mt-2'>{usersWithSavingsCount}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='container-fluid px-3'>
          <section className='user-table-section'>
            <div className='table-responsive'>
              <table className='table table-hover align-middle text-nowrap'>
                <thead className='table-light'>
                  <tr>
                    <th>
                      ORGANIZATION{' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th>
                      USERNAME{' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th>
                      EMAIL{' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th>
                      PHONE NUMBER{' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th>
                      DATE JOINED
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th>
                      STATUS
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-filter cursor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5' />
                      </svg>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 12).map((user: UserDatas, index: number) => (
                    <tr key={index}>
                      <td>lendsqr</td>
                      <td>{user.username}</td>
                      <td className='text-break'>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })
                          : 'N/A'}
                      </td>

                      <td>
                        <span
                          className={`badge status-badge ${user.status.toLowerCase()}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-three-dots-vertical cursor'
                          viewBox='0 0 16 16'
                        >
                          <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard
