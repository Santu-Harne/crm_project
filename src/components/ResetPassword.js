import React, { useState, useEffect } from 'react'
import api from '../util/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const initialState = { oldPassword: '', newPassword: '', confirmPassword: '' }

const ResetPassword = () => {
  const [password, setPassword] = useState(initialState)

  const navigate = useNavigate()
  const email = 'santosh.283143@gmail.com'

  const changeHandler = (e) => {
    const { name, value } = e.target
    setPassword({ ...password, [name]: value })
  }

  const clearHandler = () => {
    if (window.confirm('Are you sure you want to the fields?')) {
      setPassword(initialState)
    }
  }

  // function to show and hide password field
  const showPassword = (inputId, iconId) => {
    const input = document.getElementById(inputId)
    const eye = document.getElementById(iconId)
    if (input.type === 'password') {
      input.type = 'text'
      eye.classList.remove('bi-eye-fill')
      eye.classList.add('bi-eye-slash-fill')
    }
    else {
      input.type = 'password'
      eye.classList.remove('bi-eye-slash-fill')
      eye.classList.add('bi-eye-fill')
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = password
    if (newPassword !== confirmPassword) toast.error("Passwords doesn't match!")
    else {
      await api.put(`/api/updatePassword/${email}/${oldPassword}/${newPassword}`)
        .then(res => {
          // console.log(res.data);
          toast.success(res.data)
          setPassword(initialState)
          localStorage.removeItem('token')
          navigate('/login')
        }).catch(err => console.log(err))
    }
  }

  return (
    <div className='container'>
      <div className="row d-flex justify-content-center">
        <div className="col-md-5 col-sm-8">
          <div className="card mt-5">
            <div className="card-header"><h2 className="text-info">Reset Password</h2></div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password <span className='required'>*</span></label>
                  <input type="text" name="oldPassword" id="oldPassword" className='form-control' value={password.oldPassword} onChange={changeHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password <span className='required'>*</span></label>
                  <input type="password" name="newPassword" id="newPassword" className='form-control' value={password.newPassword} onChange={changeHandler} />
                  <span type='button' onClick={() => showPassword('newPassword', 'password-icon')}><i id='password-icon' className="bi bi-eye-fill"></i></span>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password <span className='required'>*</span></label>
                  <input type="password" name="confirmPassword" id="confirmPassword" className='form-control' value={password.confirmPassword} onChange={changeHandler} />
                  <span type='button' onClick={() => showPassword('confirmPassword', 'confirm-icon')}><i id='confirm-icon' className="bi bi-eye-fill"></i></span>
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

export default ResetPassword