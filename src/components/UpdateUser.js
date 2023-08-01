import React, { useEffect, useState } from 'react'
import api from '../util/api'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialUser = {
  userName: '', mobileNo: '', altMobileNo: ''
}

const UpdateUser = () => {
  const [user, setUser] = useState(initialUser)

  const params = useParams()
  const userId = 'user_0025'

  // function to update user details in state
  const changeHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // function to clear all fields
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to the fields?')) {
      setUser(initialUser)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.put(`/api/updateUser/${userId}`, user)
      .then(res => {
        console.log(res.data);
        toast.success('User data updated successfully')
        setUser(initialUser)
      }).catch(err => toast.error(err.response.message))
  }

  // on component mount all users list is fetched and stored in state
  useEffect(() => {
    try {
      const initialFetch = () => {
        api.get(`/api/getUserById/${userId}`)
          .then(res => {
            const { userName, mobileNo, altMobileNo } = res.data;
            setUser({ ...user, userName, mobileNo, altMobileNo });
          }).catch(err => console.log(err.message))
      }
      initialFetch()
    } catch (error) {
      console.log(error.message);
    }
  }, [])
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header"><h2 className="text-info">Update User</h2></div>
            <div className="card-body">
              <form className='user_form' onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="userName">User Name <span className='required'>*</span></label>
                  <input type="text" name="userName" id="userName" value={user.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                </div>
                <div className="form-group mt-3" >
                  <label htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                  <input type="text" name="mobileNo" id="mobileNo" value={user.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="altMobileNo">Alt Mobile Number</label>
                  <input type="text" name="altMobileNo" id="altMobileNo" value={user.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                </div>
                <div className="input-group mt-4 d-flex justify-content-center">
                  <input type="submit" className='btn  btn-success' value={'Submit'} />
                  <button className='btn btn-secondary' onClick={clearHandler}>Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser