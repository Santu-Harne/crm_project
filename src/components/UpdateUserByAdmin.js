import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../util/api'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = { userName: '', role: '', reportingUsrId: '', reportingUsrName: '', statusValue: '' }

const UpdateUserByAdmin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(initialState)
  const [extUsers, setExtUsers] = useState(null)
  const [reportingToUsers, setReportingToUsers] = useState(null)

  const { adminId, userId } = useParams()
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    if (value !== 'SalesPerson') {
      setReportingToUsers(extUsers.filter(item => item.role !== 'SalesPerson'))
    }
    else setReportingToUsers(extUsers)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const { role, reportingUsrId, statusValue } = user
    try {
      await api.put(`/api/updateByAdmin/${userId}/${role}/${reportingUsrId}`)
        .then(res => {
          // console.log(res.data);
        }).catch(err => {
          console.log(err.message);
        })

      await api.put(`/api/updateStatus/${userId}/${statusValue}`)
        .then(res => {
          // console.log(res.data);
        }).catch(err => console.log(err))

      toast.success('User details updated successfully!')
      navigate(`/admin/users_list/${adminId}`)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await api.get(`/api/getDtoById/${userId}`)
          .then(res => {
            const { role, userName, reportingUsrId, reportingUsrName, statusValue } = res.data
            setUser({ ...user, userName, role, reportingUsrId, reportingUsrName, statusValue })
            // console.log(res.data);
          }).catch(err => console.log(err))
        await api.get('/api/getAllUsersNDtos')
          .then(res => {
            // console.log(res.data);
            setExtUsers(res.data)
            setReportingToUsers(res.data)
          }).catch(err => console.log(err.message))
        setIsLoading(false)
      }
      catch (error) {
        console.log(error.message);
      }
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="text-info">Update By Admin</h2>
              <button className='btn btn-secondary' onClick={() => navigate(`/admin/users_list/${adminId}`)}>UsersList</button>
            </div>
            <div className="card-body">
              {
                isLoading ? (<h3 >Loading <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input type="text" name="userName" id="userName" value={user.userName} className='form-control' readOnly />
                    </div>
                    <div className="form-group ">
                      <label htmlFor="role">Role <span className='required'>*</span></label>
                      <select onChange={changeHandler} name="role" className="form-select" required>
                        <option value="" hidden>{user.role}</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Marketing User">Marketing User</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="SalesPerson">Sales Person</option>
                        <option value="Sales Manager">Sales Manager</option>
                        <option value="Supporting Manager">Supporting Manager</option>
                        <option value="Restricted User">Restricted User</option>
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="reportingUsrId">Reporting_To <span className='required'>*</span></label>
                      <select onChange={changeHandler} className="form-select" name='reportingUsrId' id='reportingUsrId' required>
                        <option value="" hidden>{user.reportingUsrName} -- {user.reportingUsrId}</option>
                        {
                          reportingToUsers && reportingToUsers.map((user, index) => {
                            return (
                              <option key={index} value={user.userId}>{user.userName} -- {user.userId} -- {user.role} </option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="statusValue">Status <span className='required'>*</span></label>
                      <select className='form-select' name="statusValue" id="statusValue" onChange={changeHandler}>
                        <option value="" hidden>{user.statusValue}</option>
                        <option value="Active">Active</option>
                        <option value="DeActive">DeActive</option>
                      </select>
                    </div>
                    <div className="form-group mt-4">
                      <button type='submit' onClick={submitHandler} className='btn btn-success'>Update</button>
                    </div>
                  </>)
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUserByAdmin