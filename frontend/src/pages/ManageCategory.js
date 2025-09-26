import React from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link } from 'react-router-dom'

const ManageCategory = () => {
  return (
    <AdminLayout>
        <div>
            <h3 className='text-center text-dark mb-4'>
                <i className='fas fa-list-alt me-1'></i>
                Manage Food Category
            </h3>
              <h5 className='text-end text-muted'>
                  <i className='fas fa-database me-2'></i>
                  Total Category
                  <span className='ms-2 badge bg-success'>5</span>
              </h5>

              <div className='mb-3'>
                  <input type="text" className='form-control w-50' placeholder='Search by category name...'/>
              </div>

              <table className='table table-bordered table-hover table-striped'>
                  <thead className='table-dark'>
                      <tr>
                          <th>Sl.No</th>
                          <th>Category Name</th>
                          <th>Creation Date</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>South India</td>
                          <td>27/09/2025</td>
                          <td>
                              <Link className='btn btn-sm btn-primary me-2'>
                                <i className='fas fa-edit me-1'></i>Edit
                              </Link>
                              <button className='btn btn-sm btn-danger'>
                                  <i className='fas fa-trash-alt me-1'></i>
                                  Delete
                              </button>
                          </td>
                      </tr>
                  </tbody>
              </table>
        </div>
    </AdminLayout>
  )
}

export default ManageCategory