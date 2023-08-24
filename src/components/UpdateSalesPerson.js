import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'


const initialState = { name: '', maxTarget: '', frequency: '', threshold: '', currency: '', duration: '' }

const UpdateSalesPerson = () => {
  const [sales_person_details, setSales_person_details] = useState(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const { state } = useLocation()
  const navigate = useNavigate()


  const changeHandler = (e) => {
    const { name, value } = e.target
    setSales_person_details({ ...sales_person_details, [name]: value })
  }
  const clearHandler = () => {
    if (window.confirm('Are you sure to clear fields?')) setSales_person_details(initialState)
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    await api.put(`/app/updateSalesperson/${state.spId}`, sales_person_details)
      .then(res => {
        // console.log(res.data);
        toast.success('Salesperson details updated successfully')
        setSales_person_details(initialState)
        navigate('/salesPersons_list')
      }).catch(err => console.log(err))

  }
  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/app/getSalesPerson/${state.spId}`)
        .then(res => {
          // console.log(res.data);
          const { user, maxTarget, frequency, threshold, currency, duration } = res.data
          setSales_person_details({ ...sales_person_details, name: user.userName, maxTarget, frequency, threshold, currency, duration })
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
            <div className="card-header"><h2 className='text-info'>Update Sales Person</h2></div>
            <div className="card-body">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin"></i></h3>) :
                  (<form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="target">Name</label>
                      <input type="text" value={sales_person_details.name} name="name" id="name" className='form-control' readOnly />
                    </div>
                    <div className="form-group">
                      <label htmlFor="maxTarget">Max Target</label>
                      <input type="number" value={sales_person_details.maxTarget} onChange={changeHandler} name="maxTarget" id="maxTarget" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="frequency">Frequency</label>
                      <input type="number" value={sales_person_details.frequency} onChange={changeHandler} name="frequency" id="frequency" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="threshold">Threshold</label>
                      <input type="number" value={sales_person_details.threshold} onChange={changeHandler} name="threshold" id="threshold" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <select name="currency" id="currency" value={sales_person_details.currency} onChange={changeHandler} className='form-select' required>
                        <option value={sales_person_details.currency} hidden>{sales_person_details.currency}</option>
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
                    <div className="form-group">
                      <label htmlFor="duration">Duration</label>
                      <select value={sales_person_details.duration} onChange={changeHandler} name="duration" id="duration" className='form-select' required>
                        <option value={sales_person_details.duration} hidden>{sales_person_details.duration}</option>
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
                    <div className="input-group mt-4 d-flex justify-content-center">
                      <button type='submit' className='btn  btn-success'>Update <i className="fa-solid fa-pen-to-square"></i></button>
                      <button type='button' className='btn btn-secondary' onClick={clearHandler}>Clear <i className="fa-solid fa-rotate"></i></button>
                    </div>
                  </form>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateSalesPerson