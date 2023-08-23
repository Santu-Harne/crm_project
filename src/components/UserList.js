import React, { useState, useEffect, useCallback } from 'react'
import api from '../util/api'
import { useParams, useNavigate } from 'react-router-dom'


const UserList = () => {
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const { adminId } = useParams()

  const initialFetch = useCallback(() => {
    api.get('/api/getAllUsersNDtos')
      .then(res => {
        // console.log(res.data);
        setUsers(res.data)
        setIsLoading(false)
      }).catch(err => console.log(err))
  }, [users])

  useEffect(() => {
    initialFetch()

  }, [])
  return (
    <div className='mx-3'>
      <div className="row">
        <div className="card p-0 mt-3">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
            <h2 className="text-info">User List</h2>
            <button className='btn btn-secondary' onClick={() => navigate(`/user_dashboard/${adminId}`)}>Admin Dashboard</button>
          </div>
          <div className="card-body users-data">
            {isLoading ? (<h3 >Loading <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
              <table className="table table-hover">
                <thead>
                  <tr >
                    <th>User </th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Alt Mobile</th>
                    <th>Role</th>
                    <th>Reporting To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users && users.map((user, index) => {
                      return (
                        <tr key={user.userId}>
                          <td >{user.userName}</td>
                          <td>{user.email}</td>
                          <td>{user.mobileNo}</td>
                          <td>{user.altMobileNo}</td>
                          <td>{user.role}</td>
                          <td>{user.reportingUsrName}</td>
                          <td >{user.statusValue} <i type='button' onClick={() => navigate(`/admin/updateRoleReporting/${adminId}/${user.userId}`)} className="fa-solid fa-pen-to-square float-end"></i></td>

                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>)}

          </div>
        </div>

      </div>
    </div >
  )
}

export default UserList