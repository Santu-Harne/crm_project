import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const UserDashboard = () => {
  const [user, setUser] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const userId = 'user_0025'

  const logoutHandler = () => {
    if (window.confirm('Are you sure to log out?')) {
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      // console.log(params.username);
      await api.get(`/api/getByEmail/${params.username}`)
        .then(res => {
          // console.log(res.data);
          setUser(res.data)
        }).catch(err => console.log(err.message))
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      {user ? <>
        <div className="d-flex justify-content-between mt-5 align-items-center">
          <h2 className="text-info">Hai {user.userName}, Welcome!</h2>
          <button className='btn btn-secondary' onClick={logoutHandler}>Logout</button>
        </div>

      </> : ''}
    </div>
  )
}

export default UserDashboard