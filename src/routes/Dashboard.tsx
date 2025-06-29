import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { fetchUsers } from '../services/api'
import UsersIcon from '../Asset/users.png'
import ActiveUsers from '../Asset/active-users.png'
import UsersWithLoan from '../Asset/users-with-loan.png'
import UsersWithOutLoan from '../Asset/users-with-savings.png'
import Pagination from '../components/Pagination'

interface UserDatas {
  username: string
  email: string
  phone: string
  hasLoan: boolean
  hasSavings: boolean
  createdAt: string
  dateJoined: string
  updatedAt?: string
  status: 'Active' | 'Inactive' | 'Pending'
}

function Dashboard () {
  const [dashboardUi, setDashboardUi] = useState(true)
  const [users, setUsers] = useState<UserDatas[]>([])
  const [openMore, setOpenMore] = useState(false)

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err))
    setDashboardUi(true)
  }, [])

  // Paginate users
  const totalItems = users.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = users.slice(startIndex, endIndex)

  // Stats
  const activeUsersCount = users.filter(user => user.status === 'Active').length
  const usersWithLoanCount = users.filter(user => user.hasLoan).length
  const usersWithSavingsCount = users.filter(user => user.hasSavings).length

  return (
    <div>
      <DashboardLayout>
        {dashboardUi && (
          <div className='container total-users mt-4'>
            <div className='row mb-3 title-total-users'>
              <div className='col-12'>
                <h4>Users</h4>
              </div>
            </div>
            <div className='row total-users-row g-3'>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm text-start'>
                  <img src={UsersIcon} alt='users icon' className='mb-2' />
                  <br />
                  <small className='text-uppercase fw-bold'>Users</small>
                  <h3 className='totalCount mt-2'>{users.length}</h3>
                </div>
              </div>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm'>
                  <img src={ActiveUsers} alt='users icon' className='mb-2' />
                  <br />
                  <small className='text-uppercase fw-bold'>Active users</small>
                  <h3 className='totalCount mt-2'>{activeUsersCount}</h3>
                </div>
              </div>
              <div className='col-12 col-md-3'>
                <div className='totalBox p-4 bg-white rounded shadow-sm'>
                  <img src={UsersWithLoan} alt='users icon' className='mb-2' />
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
                  />
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
                    <th>ORGANIZATION</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>DATE JOINED</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user: UserDatas, index: number) => (
                    <tr key={index} className='cursor'>
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
                          onClick={() => setOpenMore(prev => !prev)}
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

        {openMore && (
          <div className='popup-menu'>
            <div className='popup-item cursor'>
              <i className='bi bi-person-dash me-2'></i>
              <span>View Details</span>
            </div>
            <div className='popup-item cursor'>
              <i className='bi bi-person-dash me-2'></i>
              <span>Blacklist User</span>
            </div>
            <div className='popup-item cursor'>
              <i className='bi bi-person-check me-2'></i>
              <span>Activate User</span>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onItemsPerPageChange={setItemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard
