import React, { useState, useEffect } from 'react'
import api from '../util/api'
import toast from 'react-hot-toast'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const initialOpportunity = { opportunityName: '', opportunitySize: '' }


const UpdateOpportunity = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contactId, setContactId] = useState(null)
  const [offeringId, setOfferingId] = useState(null)
  const [opportunity, setOpportunity] = useState(initialOpportunity)

  const { state } = useLocation()
  const { oppId } = state
  const navigate = useNavigate()

  const opportunityHandler = (e) => {
    const { name, value } = e.target
    setOpportunity({ ...opportunity, [name]: value })
  }

  const clearHandler = () => {
    if (window.confirm('Are you sure to clear fields?')) {
      setOpportunity(initialOpportunity)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      api.put(`/app/${oppId}/${contactId}/${offeringId}`, opportunity)
        .then(res => {
          // console.log(res.data);
          toast.success('Opportunity details updated successfully')
          navigate('/opportunities_list')
          setOpportunity(initialOpportunity)
        }).catch(err => console.log(err))
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    try {
      const initialFetch = async () => {
        api.get(`/app/${oppId}`)
          .then(res => {
            // console.log(res.data);
            setContactId(res.data.contact.contactId)
            setOfferingId(res.data.offering.offeringId)
            const { opportunityName, opportunitySize } = res.data
            setOpportunity({ ...opportunity, opportunityName, opportunitySize })
          }).catch(err => console.log(err))
        setIsLoading(false)
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
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="text-info">Update Opportunity</h2>
            </div>
            <div className="card-body pt-0">
              {isLoading && <h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>}
              <form onSubmit={submitHandler}>
                <div className="form-group mt-3">
                  <label htmlFor="opportunityName">Opportunity Name <span className='required'>*</span></label>
                  <input type="text" name="opportunityName" id="opportunityName" value={opportunity.opportunityName} onChange={opportunityHandler} className='form-control' required />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="opportunitySize">Opportunity Size <span className='required'>*</span></label>
                  <input type="text" name="opportunitySize" id="opportunitySize" value={opportunity.opportunitySize} onChange={opportunityHandler} className='form-control' required />
                </div>
                <div className="input-group mt-4 d-flex justify-content-center">
                  <input type="submit" value={'Submit'} className='btn btn-success' />
                  <button onClick={clearHandler} className='btn btn-secondary'>Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateOpportunity