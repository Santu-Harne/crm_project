import React, { useEffect, useState } from 'react'
import api from '../../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialState = { firstName: '', lastName: '', email: '', mobileNumber: '', address: '', company: '', country: '', designation: '', department: '', type: '', vendorType: '', vendorDescription: '', partnerType: '', partnerSkills: '', partnerDescription: '' }

const UpdateVendorAndContact = () => {
  const [contactInfo, setContactInfo] = useState(initialState)

  const navigate = useNavigate()
  const { state } = useLocation()


  const changeHandler = (e) => {
    const { name, value } = e.target
    setContactInfo({ ...contactInfo, [name]: value })
  }
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setContactInfo(initialState)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    try {
      api.put(`/app/vendorpartners/updateVendorPartner/${state.contactId}`, contactInfo)
        .then(res => {
          // console.log(res.data);
          toast.success('Contact updated successfully')
          setContactInfo(initialState)
          navigate('/allContactList')
        }).catch(err => console.log(err))
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    api.get(`/app/vendorpartners/${state.contactId}`)
      .then(res => {
        // console.log(res.data);
        setContactInfo(res.data)
      }).catch(err => console.log(err))
  }, [])
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card mt-3">
            <div className="card-header"><h2 className="text-info">Create Vendor/Partner</h2></div>
            <div className="card-body pt-0">
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <label htmlFor="firstName">First Name <span className='required'>*</span></label>
                    <input type="text" name="firstName" id="firstName" className='form-control' value={contactInfo.firstName} onChange={changeHandler} pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="lastName">Last Name <span className='required'>*</span></label>
                    <input type="text" name="lastName" id="lastName" className='form-control' value={contactInfo.lastName} onChange={changeHandler} pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="email">Email <span className='required'>*</span></label>
                    <input type="text" name="email" id="email" className='form-control' value={contactInfo.email} onChange={changeHandler} pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="mobileNumber">Mobile Number <span className='required'>*</span></label>
                    <input type="text" name="mobileNumber" id="mobileNumber" value={contactInfo.mobileNumber} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="address">Address <span className='required'>*</span></label>
                    <input type="text" name="address" id="address" className='form-control' value={contactInfo.address} onChange={changeHandler} required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="company">Company <span className='required'>*</span></label>
                    <input type="text" name="company" id="company" className='form-control' value={contactInfo.company} onChange={changeHandler} required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="country">Country <span className='required'>*</span></label>
                    <input type="text" name="country" id="country" className='form-control' value={contactInfo.country} onChange={changeHandler} pattern='[A-Za-z]{3,}' title="Only characters are allowed" required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="designation">Designation <span className='required'>*</span></label>
                    <input type="text" name="designation" id="designation" className='form-control' value={contactInfo.designation} onChange={changeHandler} required />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label htmlFor="department">Department <span className='required'>*</span></label>
                    <input type="text" name="department" id="department" className='form-control' value={contactInfo.department} onChange={changeHandler} required />
                  </div>
                  {contactInfo.type === 'Vendor' &&
                    <>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="vendorType">Vendor Type <span className='required'>*</span></label>
                        <input type="text" name="vendorType" id="vendorType" className='form-control' value={contactInfo.vendorType} onChange={changeHandler} required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="vendorDescription">Vendor Description <span className='required'>*</span></label>
                        <input Description="text" name="vendorDescription" id="vendorDescription" className='form-control' value={contactInfo.vendorDescription} onChange={changeHandler} required />
                      </div>
                    </>
                  }
                  {contactInfo.type === 'Partner' &&
                    <>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="partnerType">Partner Type <span className='required'>*</span></label>
                        <input type="text" name="partnerType" id="partnerType" className='form-control' value={contactInfo.partnerType} onChange={changeHandler} required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="partnerSkills">Partner Skills <span className='required'>*</span></label>
                        <input type="text" name="partnerSkills" id="partnerSkills" className='form-control' value={contactInfo.partnerSkills} onChange={changeHandler} required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="partnerSkills">Partner Description <span className='required'>*</span></label>
                        <input type="text" name="partnerDescription" id="partnerDescription" className='form-control' value={contactInfo.partnerDescription} onChange={changeHandler} required />
                      </div>
                    </>
                  }
                  <div className="col-12 mt-4">
                    <div className="input-group d-flex justify-content-center">
                      <input type="submit" className='btn  btn-success' value={'Update'} />
                      <button type='button' className='btn btn-secondary' onClick={clearHandler}>Clear</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateVendorAndContact