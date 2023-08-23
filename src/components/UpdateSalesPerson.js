import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'


const initialState = { name: '', target: '', frequency: '', amount: '', currency: '', duration: '' }

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
    const { target, frequency, amount, currency, duration } = sales_person_details
    e.preventDefault()
    await api.put(`/app/updateSalesperson/${state.spId}`, { target, frequency, amount, currency, duration })
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
          const { user, target, frequency, amount, currency, duration } = res.data
          setSales_person_details({ ...sales_person_details, name: user.userName, target, frequency, amount, currency, duration })
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
                      <label htmlFor="target">Target</label>
                      <input type="text" value={sales_person_details.target} onChange={changeHandler} name="target" id="target" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="frequency">Frequency</label>
                      <input type="text" value={sales_person_details.frequency} onChange={changeHandler} name="frequency" id="frequency" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="amount">Amount</label>
                      <input type="text" value={sales_person_details.amount} onChange={changeHandler} name="amount" id="amount" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <input type="text" value={sales_person_details.currency} onChange={changeHandler} name="currency" id="currency" className='form-control' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration">Duration</label>
                      <input type="text" value={sales_person_details.duration} onChange={changeHandler} name="duration" id="duration" className='form-control' />
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