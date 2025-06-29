import React from 'react'

const Pagination = ({
  totalItems = 100,
  options = [10, 25, 50, 100],
  itemsPerPage,
  currentPage,
  onItemsPerPageChange,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage, '...', totalPages)
      }
    }

    return pages.map((p, i) => (
      <button
        key={i}
        className={`px-2 py-1 rounded text-sm ${
          p === currentPage
            ? 'bg-blue-100 text-blue-700 fw-bold'
            : 'text-secondary'
        } ${p === '...' && 'cursor-default'}`}
        onClick={() => typeof p === 'number' && handlePageChange(p)}
        disabled={p === '...'}
      >
        {p}
      </button>
    ))
  }

  return (
    <div className='d-flex justify-content-between align-items-center w-100 mt-4 px-3 pagination-toolbar'>
      {/* Left - Dropdown */}
      <div className='d-flex align-items-center gap-2 text-secondary fs-sm'>
        <span className='me-1'>Showing</span>
        <select
          className='form-select form-select-sm show-limit-select'
          value={itemsPerPage}
          onChange={e => {
            onItemsPerPageChange(Number(e.target.value))
            onPageChange(1)
          }}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className='ms-1'>out of {totalItems}</span>
      </div>

      {/* Right - Pagination */}
      <div className='d-flex align-items-center gap-1'>
        <button
          className='btn btn-sm btn-light'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {renderPageNumbers()}

        <button
          className='btn btn-sm btn-light border-0 border-white'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Pagination
