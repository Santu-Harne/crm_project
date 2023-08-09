import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../util/api'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = { role: '', reportingUsrName: '', reportingUsrId: '' }

const UpdateUserByAdmin = () => {
  const [user, setUser] = useState(initialState)
  const [extUsers, setExtUsers] = useState(null)
  const [reportingToUsers, setReportingToUsers] = useState(null)

  const { userId } = useParams()
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    if (value !== 'SalesPerson') {
      setReportingToUsers(extUsers.filter(item => {
        return item.authorities.some(auth => auth.authority !== "SalesPerson");
      }))
    }
    else setReportingToUsers(extUsers)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const { role, reportingUsrId } = user
    await api.put(`/api/updateByAdmin/${userId}/${role}/${reportingUsrId}`)
      .then(res => {
        // console.log(res.data);
        toast.success(res.data)
        navigate(`/admin/users_list/${userId}`)
      }).catch(err => {
        console.log(err.message);
      })
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await api.get(`/api/getDtoById/${userId}`)
          .then(res => {
            const { role, reportingUsrId, reportingUsrName } = res.data
            setUser({ ...user, role, reportingUsrId, reportingUsrName })
            console.log(res.data);
          }).catch(err => console.log(err.message))
        await api.get('/api/getAllUsers')
          .then(res => {
            // console.log(res.data);
            setExtUsers(res.data)
            setReportingToUsers(res.data)
          }).catch(err => console.log(err.message))
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
              <button className='btn btn-secondary' onClick={() => navigate(`/admin/users_list/${userId}`)}>UsersList</button>
            </div>
            <div className="card-body">
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
                    reportingToUsers && reportingToUsers.map(user => {
                      return (
                        <option key={user.userId} value={user.userId}>{user.userName} -- {user.userId} -- {user.authorities[0].authority} </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group mt-4">
                <button type='submit' onClick={submitHandler} className='btn btn-success'>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUserByAdmin