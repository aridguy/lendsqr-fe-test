import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { fetchUsers } from '../services/api'
import UsersIcon from '../Asset/users.png'
import ActiveUsers from '../Asset/active-users.png'
import UsersWithLoan from '../Asset/users-with-loan.png'
import UsersWithOutLoan from '../Asset/users-with-savings.png'
import Pagination from '../components/Pagination'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// import { log } from 'console'

interface UserDatas {
  username: string
  email: string
  phone: string
  hasLoan: boolean
  company: string
  hasSavings: boolean
  createdAt: string
  dateJoined: string
  updatedAt?: string
  employmentDuration: string
  employmentSector: string
  employmentStatus: string
  monthlyIncome: string
  firstName: string
  balance: string
  lastName: string
  name: string
  _id: string
  userTier: string
  organization: string
  picture: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
  }
  guarantor: {
    address: string
    email: string
    fullName: string
    phone: string
    relationship: string
  }
  bankDetails: {
    accountNumber: string
    bankName: string
    accountType: string
  }
  familyDetails: {
    children: string
  }
  education: {
    graduationYear: string
    institution: string
    level: string
  }
  accountBalance: number
  bvn: string
  gender: string

  residenceType: string
  maritalStatus?: string
  status: 'Active' | 'Inactive' | 'Pending'
}

function Dashboard () {
  const [users, setUsers] = useState<UserDatas[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserDatas[]>([])
  const [filterScreen, setFilterScreen] = useState(false)
  const [openMore, setOpenMore] = useState(false)
  const [dashboardScreen, setDashboardScreen] = useState(true)
  const [userDetails, setDetails] = useState(false)

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
  const [selectedUser, setSelectedUser] = useState<UserDatas | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // If no token, redirect to login
      navigate('/')
    }
  }, [navigate])

  return (
    <DashboardLayout>
      {/* dashboard default UI */}
      <div className='container mt-4'>
        {dashboardScreen && (
          <div>
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
                  <small className='text-uppercase fw-bold'>
                    Users with loan
                  </small>
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
                <table className='table table-hover'>
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
                        <td>{user.company}</td>
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
                            onClick={() => {
                              setOpenMore(!openMore)
                              setSelectedUser(user)
                              console.log('Selected User:', user)
                            }}
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
                  <div
                    className='popup-item cursor'
                    onClick={() => {
                      setDashboardScreen(false)
                      setDetails(true)
                      setOpenMore(false)
                    }}
                  >
                    View Details
                  </div>
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
                      {
                        label: 'Organization',
                        key: 'organization',
                        type: 'text'
                      },
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
        )}
      </div>
      {/* toggle user details visible */}
      <div className='container'>
        {userDetails && (
          <div>
            <div className='container'></div>
            {/* {headers} */}
            <div className='row'>
              <div className='col-md-12'>
                <span
                  className='text-black cursor'
                  onClick={() => {
                    setDashboardScreen(true)
                    setDetails(false)
                    setOpenMore(false)
                    setSelectedUser(null) // Reset selected user when going back
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-arrow-left'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'
                    />
                  </svg>{' '}
                  Back to Users
                </span>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-8'>
                <h5>User Details</h5>
              </div>
              <div className='col-md-4'>
                <div className='d-flex justify-content-end gap-2'>
                  <button className='btn btn-outline-danger'>
                    Blacklist User
                  </button>
                  <button className='btn btn-outline-primary'>
                    Activate User
                  </button>
                </div>
              </div>
            </div>
            {
              // rendering selected user details
              <div className='row mt-3'>
                <div className='userDetailsHeader'>
                  <div className='row d-flex align-items-center justify-content-between p-3 '>
                    <div className='col-md-2 '>
                      {selectedUser?.picture && (
                        <img
                          src={selectedUser.picture}
                          alt={selectedUser.name || 'User'}
                          className='img-fluid profile-pics'
                        />
                      )}
                    </div>
                    <div className='col-md-3'>
                      <h5>{selectedUser?.name}</h5>
                      <small>{selectedUser?._id?.slice(0, 13)}...</small>
                    </div>
                    <div className='col-md-2'>
                      <p>Users Tier</p>
                      <small className='flex items-center gap-1'>
                        {/* {selectedUser?.userTier} */}
                        {[...Array(selectedUser?.userTier || 0)].map((_, i) => (
                          <Star key={i} size={14} color='gold' />
                        ))}
                      </small>
                    </div>
                    <div className='col-md-5'>
                      <h4>
                        {selectedUser?.balance &&
                          `₦${Number(
                            selectedUser.balance.replace(/[^\d.]/g, '')
                          ).toLocaleString()}`}
                      </h4>

                      <small>
                        {selectedUser?.bankDetails?.accountNumber}/
                        {selectedUser?.bankDetails?.bankName}
                      </small>
                    </div>
                  </div>

                  <div className='row mt-5'>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>General Details</span>
                    </div>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>Document</span>
                    </div>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>Bank Details</span>
                    </div>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>Loans</span>
                    </div>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>Savings</span>
                    </div>
                    <div className='col-md-2'>
                      <span className='cursor tab-item'>App & Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              // rendering selected user details
              <div className='row mt-4'>
                <div className='userDetailsHeader'>
                  <div className='row'>
                    <div className='col-md-12 '>
                      <p className='fw-bold'>Personal Information</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3 '>
                      <sup className=''>Full Name</sup> <br />
                      <small> {selectedUser?.name}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Phone</sup>
                      <br />
                      <small>{selectedUser?.phone}</small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Email</sup>
                      <br />
                      <small>{selectedUser?.email}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>BVN</sup> <br />
                      <small>{selectedUser?.bvn}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Gender</sup> <br />
                      <small>{selectedUser?.gender}</small>
                    </div>
                  </div>
                  <div className='row mt-5'>
                    <div className='col-md-3 '>
                      <sup className=''>Marital Status</sup> <br />
                      <small>
                        {' '}
                        {selectedUser?.maritalStatus || 'Not specified'}
                      </small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Children</sup>
                      <br />
                      <small>{selectedUser?.familyDetails?.children}</small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Type of Residence</sup>
                      <br />
                      <small>{selectedUser?.residenceType}</small>
                    </div>
                    <div className='col-md-2 '></div>
                    <div className='col-md-2 '></div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-12 '>
                      <p className='fw-bold'>Education & Employment</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3 '>
                      <sup className=''>Level of Education</sup> <br />
                      <small>
                        {' '}
                        {selectedUser?.education?.level || 'Not specified'}
                      </small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Employment Status</sup>
                      <br />
                      <small>{selectedUser?.employmentStatus}</small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Sector of Employment</sup>
                      <br />
                      <small>{selectedUser?.employmentSector}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Duration of employment</sup> <br />
                      <small>{selectedUser?.employmentDuration}</small>
                    </div>
                    <div className='col-md-2 '></div>
                  </div>
                  <div className='row mt-5'>
                    <div className='col-md-3 '>
                      <sup className=''>Office Email</sup> <br />
                      <small> {selectedUser?.email || 'Not specified'}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Monthly Income</sup>
                      <br />

                      <small>
                        {selectedUser?.monthlyIncome &&
                          `₦${Number(
                            selectedUser.monthlyIncome.replace(/[^\d.]/g, '')
                          ).toLocaleString()}`}
                      </small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Loan Repayment</sup>
                      <br />
                      <small>{selectedUser?.residenceType}</small>
                    </div>
                    <div className='col-md-2 '></div>
                    <div className='col-md-2 '></div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-12 '>
                      <p className='fw-bold'>Socials</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3 '>
                      <sup className=''>Twitter</sup> <br />
                      <small> @{selectedUser?.socialMedia?.twitter}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Facebook</sup>
                      <br />
                      <small>@{selectedUser?.socialMedia?.facebook} </small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Instagram</sup>
                      <br />
                      <small>@{selectedUser?.socialMedia?.instagram} </small>
                    </div>
                    <div className='col-md-2 '></div>
                    <div className='col-md-2 '></div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-12 '>
                      <p className='fw-bold'>Guarantor</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3 '>
                      <sup className=''>Full name</sup> <br />
                      <small>
                        {' '}
                        {selectedUser?.guarantor.fullName}
                      </small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Phone</sup>
                      <br />
                      <small>{selectedUser?.guarantor.phone}</small>
                    </div>
                    <div className='col-md-3 '>
                      <sup className=''>Email Address</sup>
                      <br />
                      <small>{selectedUser?.guarantor.email}</small>
                    </div>
                    <div className='col-md-2 '>
                      <sup className=''>Relationship</sup>
                      <br />
                      <small>{selectedUser?.guarantor.relationship}</small>
                    </div>
                    <div className='col-md-2 '></div>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
