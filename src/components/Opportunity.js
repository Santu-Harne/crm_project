import React, { useState, useEffect } from 'react'
import api from './../util/api'
import toast from 'react-hot-toast'

const initialOpportunity = { opportunityName: '', opportunitySize: '' }
const initialOpportunitySub = { opportunityCreatedDate: '', noOfInstallments: '', price: '', duration: '', currency: '', status: { statusValue: 'opportunity' } }

const Opportunity = () => {
  const [contactId, setContactId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [offeringId, setOfferingId] = useState('')
  const [contacts, setContacts] = useState(null)
  const [offering, setOffering] = useState(null)
  const [opportunity, setOpportunity] = useState(initialOpportunity)
  const [opportunitySub, setOpportunitySub] = useState(initialOpportunitySub)

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    return currentDate
  };

  const offeringIdHandler = (e) => {
    const value = e.target.value
    setOfferingId(value)
  }
  const contactIdHandler = (e) => {
    const value = e.target.value
    setContactId(value)
  }

  const opportunityHandler = (e) => {
    const { name, value } = e.target
    setOpportunity({ ...opportunity, [name]: value })
  }
  const opportunitySubHandler = (e) => {
    const { name, value } = e.target
    setOpportunitySub({ ...opportunitySub, [name]: value })
  }
  const clearHandler = () => {
    if (window.confirm('Are you sure to clear fields?')) {
      setOpportunity(initialOpportunity)
      setOpportunitySub(initialOpportunitySub)
      setContactId('')
      setOfferingId('')
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      let oppId = null;
      const oppRes = await api.post(`/app/saveOpportunity/${contactId}/${offeringId}`, opportunity)
      console.log(oppRes);
      if (oppRes.status === 201) {
        oppId = oppRes.data.opportunityId
      }
      if (oppId) {
        const oppSubRes = await api.post(`/api/app/saveOpportunitySub/${oppId}`, opportunitySub)
        console.log(oppSubRes);
        if (oppSubRes.status === 201) {
          toast.success('Opportunity Created Successfully');
          oppId = ''
          setOpportunity(initialOpportunity)
          setOpportunitySub(initialOpportunitySub)
          setContactId('')
          setOfferingId('')
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    setOpportunitySub({ ...opportunitySub, opportunityCreatedDate: getCurrentDate() })
    try {
      const initialFetch = async () => {
        const offeringResponse = await api.get('/OfferingController/get_all_offering')
        // console.log(offeringResponse);
        if (offeringResponse.status === 200) setOffering(offeringResponse.data)
        const contactResponse = await api.get('/ContactController/get_all_contact')
        // console.log(contactResponse);
        if (contactResponse.status === 200) {
          setContacts(contactResponse.data)
          setIsLoading(false)
        }
      }
      initialFetch()
    } catch (error) {
      console.log(error.message);
    }
  }, [])

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="text-info">Opportunity</h2>
            </div>
            <div className="card-body pt-0">
              {isLoading && <h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>}
              {
                contacts && offering ? (
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <label htmlFor="contactId">Contact ID <span className='required'>*</span></label>
                        <select value={contactId} name="contactId" id="contactId" className='form-control' onChange={contactIdHandler} required>
                          <option value="" hidden>Select</option>
                          {
                            contacts && contacts.map(contact => {
                              return (
                                <option key={contact.contactId} value={contact.contactId}>{contact.firstName}{contact.lastName} -- {contact.contactId}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="offeringId">Offering ID <span className='required'>*</span></label>
                        <select value={offeringId} name="offeringId" id="offeringId" className='form-control' onChange={offeringIdHandler} required>
                          <option value="" hidden>Select</option>
                          {
                            offering && offering.map(offer => {
                              return (
                                <option key={offer.offeringId} value={offer.offeringId}>{offer.offeringName} -- {offer.offeringId}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="opportunityName">Opportunity Name <span className='required'>*</span></label>
                        <input type="text" name="opportunityName" id="opportunityName" value={opportunity.opportunityName} onChange={opportunityHandler} className='form-control' required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="opportunitySize">Opportunity Size <span className='required'>*</span></label>
                        <input type="text" name="opportunitySize" id="opportunitySize" value={opportunity.opportunitySize} onChange={opportunityHandler} className='form-control' required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="noOfInstallments">No Of Installments <span className='required'>*</span></label>
                        <input type="number" name="noOfInstallments" id="noOfInstallments" value={opportunitySub.noOfInstallments} onChange={opportunitySubHandler} className='form-control' required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="opportunityCreatedDate">Opportunity Created Date <span className='required'>*</span></label>
                        <input type="date" value={getCurrentDate()} name="opportunityCreatedDate" id="opportunityCreatedDate" onChange={opportunitySubHandler} className='form-control' readOnly />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="price">Price<span className='required'>*</span></label>
                        <input type="number" name="price" id="price" value={opportunitySub.price} onChange={opportunitySubHandler} className='form-control' required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="duration">Duration <span className='required'>*</span></label>
                        <input type="date" min={getCurrentDate()} name="duration" id="duration" value={opportunitySub.duration} onChange={opportunitySubHandler} className='form-control' required />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label htmlFor="currency">Currency <span className='required'>*</span></label>
                        <select value={opportunitySub.currency} className='form-control' name="currency" id="currency" onChange={opportunitySubHandler} required>
                          <option value="">Select</option>
                          <option value="₹ Indian Rupees">₹ Indian Rupees</option>
                          <option value="$ US Dollar">$ US Dollar</option>
                          <option value="£ British Pound">£ British Pound</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group mt-4 d-flex justify-content-center">
                      <input type="submit" value={'Submit'} className='btn btn-success' />
                      <button onClick={clearHandler} className='btn btn-secondary'>Clear</button>
                    </div>
                  </form>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Opportunity