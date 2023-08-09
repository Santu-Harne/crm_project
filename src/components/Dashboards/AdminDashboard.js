import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="row">
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className="text-info">Admin Dashboard, Hai {user.userName}</h2>
          <button type='button' className='btn btn-warning' onClick={() => navigate(`/update_user/${user.userId}`)}>Update</button>
          <button type='button' className='btn btn-success' onClick={() => navigate(`/admin/users_list/${user.userId}`)}>UserList</button>
        </div>
      </div>
    </div>

  )
}

export default AdminDashboard