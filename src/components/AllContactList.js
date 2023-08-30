import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AllContactList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState(null)
  const [contactId, setContactId] = useState(null)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setContactId(e.target.value)
  }

  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete the contact?')) {
      api.delete(`/app/vendorpartners/deletevendorpartner/${contactId}`)
        .then(res => {
          toast.success('Contact deleted successfully')
          window.location.reload()
        }).catch(err => toast.error('Error while deleting, Please try again!'))
    }
  }

  useEffect(() => {
    api.get(`/app/vendorpartners/getallvendorpartner`)
      .then(res => {
        // console.log(res.data);
        setContacts(res.data)
        setIsLoading(false)
      }).catch(err => console.log(err))

  }, [])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="text-info">All Vendors & Partners</h2>
              <div>
                <button className='btn btn-secondary btn-sm' type='button' onClick={() => { if (contactId) navigate(`/updateContact`, { state: { contactId } }); else { alert('Please select contact to edit!') } }}>Edit</button>
                <button className='btn btn-danger btn-sm ms-2' type='button' onClick={() => { if (contactId) (deleteHandler()); else { alert('Please select contact to delete!') } }}>delete</button>
              </div>
            </div>
            <div className="card-body contact-list">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (<table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Address</th>
                      <th>Company</th>
                      <th>Country</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Vendor/Partner</th>
                      <th>Vendor Type</th>
                      <th>Vendor Description</th>
                      <th>Partner Type</th>
                      <th>Partner Skills</th>
                      <th>Partner Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      contacts && contacts.map((contact, index) => {
                        return (
                          <tr key={index}>
                            <td><input type="radio" value={contact.vendorPartnerId} onChange={changeHandler} name="contact_select" id="contact_select" /></td>
                            <td>{contact.firstName} {contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.mobileNumber}</td>
                            <td>{contact.address}</td>
                            <td>{contact.company}</td>
                            <td>{contact.country}</td>
                            <td>{contact.designation}</td>
                            <td>{contact.department}</td>
                            <td>{contact.type}</td>
                            <td>{contact.vendorType}</td>
                            <td>{contact.vendorDescription}</td>
                            <td>{contact.partnerType}</td>
                            <td>{contact.partnerSkills}</td>
                            <td>{contact.partnerDescription}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>)
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AllContactList