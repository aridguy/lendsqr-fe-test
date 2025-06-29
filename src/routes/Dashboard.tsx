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
  const [users, setUsers] = useState<UserDatas[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserDatas[]>([])
  const [filterScreen, setFilterScreen] = useState(false)
  const [openMore, setOpenMore] = useState(false)

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter inputs
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phone: '',
    date: '',
    status: ''
  })

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data)
        setFilteredUsers(data)
      })
      .catch(err => console.log(err))
  }, [])

  // Apply filters
  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault()
    let filtered = [...users]

    if (filters.organization.trim()) {
      filtered = filtered.filter(user =>
        'lendsqr'.toLowerCase().includes(filters.organization.toLowerCase())
      )
    }

    if (filters.username.trim()) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      )
    }

    if (filters.email.trim()) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      )
    }

    if (filters.phone.trim()) {
      filtered = filtered.filter(user => user.phone.includes(filters.phone))
    }

    if (filters.date) {
      filtered = filtered.filter(
        user =>
          new Date(user.createdAt).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
      )
    }

    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status)
    }

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phone: '',
      date: '',
      status: ''
    })
    setFilteredUsers(users)
  }

  const totalItems = filteredUsers.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const activeUsersCount = users.filter(user => user.status === 'Active').length
  const usersWithLoanCount = users.filter(user => user.hasLoan).length
  const usersWithSavingsCount = users.filter(user => user.hasSavings).length

  return (
    <DashboardLayout>
      <div className='container mt-4'>
        <div className='row mb-3'>
          <div className='col-12'>
            <h4>Users</h4>
          </div>
        </div>

        <div className='row g-3'>
          <div className='col-md-3'>
            <div className='p-4 bg-white rounded shadow-sm text-start'>
              <img src={UsersIcon} alt='users' className='mb-2' /> <br />
              <small className='text-uppercase fw-bold'>Users</small>
              <h3>{users.length}</h3>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='p-4 bg-white rounded shadow-sm'>
              <img src={ActiveUsers} alt='active' className='mb-2' />
              <br />
              <small className='text-uppercase fw-bold'>Active users</small>
              <h3>{activeUsersCount}</h3>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='p-4 bg-white rounded shadow-sm'>
              <img src={UsersWithLoan} alt='loan' className='mb-2' />
              <br />
              <small className='text-uppercase fw-bold'>Users with loan</small>
              <h3>{usersWithLoanCount}</h3>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='p-4 bg-white rounded shadow-sm'>
              <img src={UsersWithOutLoan} alt='savings' className='mb-2' />
              <br />
              <small className='text-uppercase fw-bold'>
                Users with savings
              </small>
              <h3>{usersWithSavingsCount}</h3>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='table-responsive'>
            <table className='table table-hover align-middle'>
              <thead className='table-light'>
                <tr>
                  <th>
                    ORGANIZATION{' '}
                    <svg
                      onClick={() => setFilterScreen(prev => !prev)}
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
                      onClick={() => setFilterScreen(prev => !prev)}
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
                      onClick={() => setFilterScreen(prev => !prev)}
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
                    PHONE{' '}
                    <svg
                      onClick={() => setFilterScreen(prev => !prev)}
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
                    DATE{' '}
                    <svg
                      onClick={() => setFilterScreen(prev => !prev)}
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
                    STATUS{' '}
                    <svg
                      onClick={() => setFilterScreen(prev => !prev)}
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
                {paginatedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>Lendsqr</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}{' '}
                      {new Date(user.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          user.status === 'Active'
                            ? 'success'
                            : user.status === 'Inactive'
                            ? 'danger'
                            : 'warning'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <svg
                        onClick={() => setOpenMore(!openMore)}
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

          {openMore && (
            <div className='popup-menu'>
              <div className='popup-item cursor'>View Details</div>
              <div className='popup-item cursor'>Blacklist User</div>
              <div className='popup-item cursor'>Activate User</div>
            </div>
          )}
        </div>

        <div>
          {filterScreen && (
            <div className='card p-4 shadow-sm mb-3 filterUi'>
              <h5 className='fw-bold mb-3'>Filter Users</h5>
              <form onSubmit={applyFilters}>
                {[
                  { label: 'Organization', key: 'organization', type: 'text' },
                  { label: 'Username', key: 'username', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' },
                  { label: 'Date', key: 'date', type: 'date' }
                ].map(({ label, key, type }) => (
                  <div key={key} className='mb-3'>
                    <label className='form-label'>{label}</label>
                    <input
                      title='for filter'
                      type={type}
                      className='form-control'
                      value={filters[key as keyof typeof filters]}
                      onChange={e =>
                        setFilters({ ...filters, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <select
                    defaultValue=''
                    aria-label='Select status'
                    className='form-select'
                    value={filters.status}
                    onChange={e =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value=''>-- Select Status --</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Pending'>Pending</option>
                  </select>
                </div>

                <div className='d-flex justify-content-end gap-2'>
                  <button type='submit' className='btn btn-primary btn-sm'>
                    Apply Filters
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onItemsPerPageChange={setItemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
