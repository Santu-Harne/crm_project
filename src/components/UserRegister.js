import React, { useState, useEffect } from 'react'
import api from './../util/api'
import toast from 'react-hot-toast';

const initialUser = {
  userName: '', email: '', password: '', role: { statusValue: '' }, mobileNo: '', altMobileNo: ''
}
const initialSalesPerson = { maxTarget: '', frequency: '', threshold: '', currency: '', duration: '' }


const UserRegister = () => {
  const [user, setUser] = useState(initialUser)
  const [isSalesPerson, setIsSalesPerson] = useState(false)
  const [SalesPerson, setSalesPerson] = useState(initialSalesPerson)
  const [extUsers, setExtUsers] = useState([])
  const [reportingTo, setReportingTo] = useState('')
  const [reportingToUsers, setReportingToUsers] = useState([])

  // function to update user details in state
  const changeHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    if (name === 'statusValue') {
      setUser({ ...user, role: { ...user.role, [name]: value } })
      if (value === 'SalesPerson') {
        setIsSalesPerson(true)
        setReportingToUsers(extUsers)
      }
      else if (value !== 'SalesPerson') {
        setIsSalesPerson(false)
        setReportingToUsers(extUsers.filter(item => item.role !== 'SalesPerson'))
      }
    }
    else setUser({ ...user, [name]: value })
  }

  // function to update sales person details in state
  const salesPersonHandler = (e) => {
    const { name, value } = e.target
    setSalesPerson({ ...SalesPerson, [name]: value })
  }

  // function to update reporting to
  const reportingHandler = (e) => {
    setReportingTo(e.target.value)
  }

  // function to clear all fields
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setUser(initialUser)
      setSalesPerson(initialSalesPerson)
    }
  }

  // function to call user register and sales person register apis
  const submitHandler = async (e) => {
    try {
      let UserId = null;
      e.preventDefault()
      const userResponse = await api.post(`/auth/saveUser/${reportingTo}`, user)
      if (userResponse.status === 200) {
        // console.log(userResponse.data);
        UserId = userResponse.data.userId;
        // console.log(UserId);
      }
      if (isSalesPerson) {
        await api.post(`/app/saveSalesPerson/${UserId}`, SalesPerson)
          .then(res => {
            console.log(res.data);
          })
      }
      toast.success('User registered successfully')
      setIsSalesPerson(false)
      setSalesPerson(initialSalesPerson)
      setUser(initialUser)
      setReportingTo("")
      initialFetch()
    } catch (error) {
      console.log(error.message);
    }
  }

  // function to show and hide password field
  const showPassword = (inputId) => {
    const input = document.getElementById(inputId)
    const eye = document.getElementById('eye-symbol')
    // alert(input)
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

  const initialFetch = () => {
    try {
      api.get('/api/getAllUsersNDtos')
        .then(res => {
          // console.log(res.data);
          setExtUsers(res.data)
          setReportingToUsers(res.data)
        }).catch(err => console.log(err.message))
    } catch (error) {
      console.log(error.message);
    }
  }


  // on component mount all users list is fetched and stored in state
  useEffect(() => {
    initialFetch()
  }, [])
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-10 ">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>User Register </h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label htmlFor="userName">User Name <span className='required'>*</span></label>
                        <input type="text" name="userName" id="userName" value={user.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="email">Email <span className='required'>*</span></label>
                        <input type="email" name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="password">Password <span className='required'>*</span></label>
                        <input type="password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
                        <span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3" >
                        <label htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                        <input type="text" name="mobileNo" id="mobileNo" value={user.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="altMobileNo">Alt Mobile Number</label>
                        <input type="text" name="altMobileNo" id="altMobileNo" value={user.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="reporting_to">Reporting_To <span className='required'>*</span></label>
                        <select onChange={reportingHandler} value={reportingTo}
                          className="form-select" name='reporting_to' id='reporting_to' required>
                          <option value="" hidden>Select</option>
                          {
                            reportingToUsers && reportingToUsers.map(user => {
                              return (
                                <option key={user.userId} value={user.userId}>{user.userName} -- {user.userId} -- {user.role}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                        <label htmlFor="role">Role <span className='required'>*</span></label>
                        <select value={user.role.statusValue} onChange={changeHandler} name="statusValue" className="form-select" required>
                          <option value="" hidden>Select</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Marketing User">Marketing User</option>
                          <option value="Marketing Manager">Marketing Manager</option>
                          <option value="SalesPerson">Sales Person</option>
                          <option value="Sales Manager">Sales Manager</option>
                          <option value="Supporting Manager">Supporting Manager</option>
                          <option value="Restricted User">Restricted User</option>
                        </select>
                      </div>
                    </div>
                    {
                      isSalesPerson && (
                        <>
                          <div className="col-md-6">
                            <div className="form-group mt-3">
                              <label htmlFor="frequency">Frequency <span className='required'>*</span></label>
                              <input type="text" value={SalesPerson.frequency} onChange={salesPersonHandler} name="frequency" id="frequency" className='form-control' required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mt-3">
                              <label htmlFor="maxTarget">Max Target <span className='required'>*</span></label>
                              <input type="text" value={SalesPerson.maxTarget} onChange={salesPersonHandler} name="maxTarget" id="maxTarget" className='form-control' required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mt-3">
                              <label htmlFor="threshold">Threshold <span className='required'>*</span></label>
                              <input type="text" value={SalesPerson.amount} onChange={salesPersonHandler} name="threshold" id="threshold" className='form-control' required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mt-3">
                              <label htmlFor="currency">Currency <span className='required'>*</span></label>
                              <select name="currency" id="currency" value={SalesPerson.currency} onChange={salesPersonHandler} className='form-select' required>
                                <option value="" hidden>Select</option>
                                <option value="INR : Indian rupee">INR : Indian rupee</option>
                                <option value="USD : United States dollar">USD : United States dollar</option>
                                <option value="GBP : British pound">GBP : British pound</option>
                                <option value="EUR : Euro">EUR : Euro</option>
                                <option value="CNY : Chinese yuan">CNY : Chinese yuan</option>
                                <option value="EGP : Egyptian pound">EGP : Egyptian pound</option>
                                <option value="CAD : Canadian dollar">CAD : Canadian dollar</option>
                                <option value="AUD : Australian dollar">AUD : Australian dollar</option>
                                <option value="BZR : Brazilian real">BZR : Brazilian real</option>
                                <option value="KWD : Kuwaiti dinar">KWD : Kuwaiti dinar</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mt-3">
                              <label htmlFor="duration">Duration <span className='required'>*</span></label>
                              <select value={SalesPerson.duration} onChange={salesPersonHandler} name="duration" id="duration" className='form-select' required>
                                <option value="" hidden>Select</option>
                                <option value="3 months">3 months</option>
                                <option value="6 months">6 months</option>
                                <option value="9 months">9 months</option>
                                <option value="12 months">12 months</option>
                                <option value="15 months">15 months</option>
                                <option value="18 months">18 months</option>
                                <option value="21 months">21 months</option>
                                <option value="24 months">24 months</option>
                              </select>
                            </div>
                          </div>
                        </>)
                    }
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <input type="submit" className='btn  btn-success' value={'Submit'} />
                        <button type='button' className='btn btn-secondary' onClick={clearHandler}>Clear</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default UserRegister