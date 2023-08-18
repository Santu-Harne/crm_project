import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialOpportunitySub = { noOfInstallements: '', price: '', duration: '', currency: '' }

const UpdateOppSub = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [opportunitySub, setOpportunitySub] = useState(initialOpportunitySub)

  const { state } = useLocation()
  const { oppId, oppSubId } = state
  const navigate = useNavigate()

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    return currentDate
  };

  const opportunitySubHandler = (e) => {
    const { name, value } = e.target
    setOpportunitySub({ ...opportunitySub, [name]: value })
  }
  const clearHandler = () => {
    if (window.confirm('Are you sure to clear fields?')) {
      setOpportunitySub(initialOpportunitySub)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    api.put(`/app/latestUpdate/${oppSubId}/${oppId}`, opportunitySub)
      .then(res => {
        // console.log(res.data);
        toast.success('OpportunitySub updated successfully')
        setOpportunitySub(initialOpportunitySub)
        navigate(`/opportunitySub_list`, { state: { oppId: oppId } })
      }).catch(err => console.log(err))
  }
  useEffect(() => {
    const initialFetch = async () => {
      api.get(`/app/getOpportunitySub/${oppSubId}`)
        .then(res => {
          // console.log(res.data);
          const { noOfInstallements, price, currency } = res.data
          setOpportunitySub({ ...opportunitySub, noOfInstallements, price, currency })
          setIsLoading(false)
        }).catch(err => console.log(err))
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="text-info">OpportunitySub Update</h2>
            </div>
            <div className="card-body pt-0">
              {isLoading ? <h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3> : (
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label htmlFor="noOfInstallments">No Of Installments <span className='required'>*</span></label>
                      <input type="number" name="noOfInstallements" id="noOfInstallements" value={opportunitySub.noOfInstallements} onChange={opportunitySubHandler} className='form-control' required />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="price">Price<span className='required'>*</span></label>
                      <input type="number" name="price" id="price" value={opportunitySub.price} onChange={opportunitySubHandler} className='form-control' required />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="duration">Duration <span className='required'>*</span></label>
                      <input type="date" min={getCurrentDate()} name="duration" id="duration" value={opportunitySub.duration} onChange={opportunitySubHandler} className='form-control' required />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="currency">Currency <span className='required'>*</span></label>
                      <select className='form-control' name="currency" id="currency" onChange={opportunitySubHandler} required>
                        <option value="" hidden>{opportunitySub.currency}</option>
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
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateOppSub