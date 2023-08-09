import React from 'react'
import { useNavigate } from 'react-router-dom'

const SalesPersonDashboard = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      <h2 className="text-info">Sales Person Dashboard, Hai {user.userName}</h2>
      <button type='button' className='btn btn-warning' onClick={() => navigate(`/update_user/${user.userId}`)}>Update</button>
    </div>
  )
}

export default SalesPersonDashboard