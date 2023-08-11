import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../util/api'
import toast from 'react-hot-toast'


const StatusUpdate = () => {
  const [user, setUser] = useState({})

  const { adminId, userId } = useParams()
  const navigate = useNavigate()


  const statusHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    api.put(`/api/updateStatus/${userId}/${user.statusValue}`)
      .then(res => {
        // console.log(res.data);
        toast.success('User Status updated successfully')
        navigate(`/admin/users_list/${adminId}`)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    const initialFetch = async () => {
      api.get(`/api/getDtoById/${userId}`)
        .then(res => {
          // console.log(res.data);
          setUser(res.data)
        }).catch(err => console.log(err))
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-header d-flex justify-content-between align-items-center"><h2 className="text-info">Status Update</h2>
              <button className='btn btn-secondary' onClick={() => navigate(`/admin/users_list/${adminId}`)}>UsersList</button>
            </div>
            <div className="card-body">
              <select className='form-select' name="statusValue" id="statusValue" onChange={statusHandler}>
                <option value="" hidden>{user.statusValue}</option>
                <option value="Active">Active</option>
                <option value="DeActive">DeActive</option>
              </select>
              <button className='btn btn-success mt-4' onClick={submitHandler}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusUpdate