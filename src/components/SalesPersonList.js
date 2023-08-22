import React, { useEffect, useState } from 'react'
import api from '../util/api'
import { useNavigate } from 'react-router-dom'

const SalesPersonList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [spId, setSpId] = useState(null)
  const [salePersons, setSalePersons] = useState(null)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setSpId(e.target.value)
  }

  useEffect(() => {
    api.get('/app/getAllSalesPerson')
      .then(res => {
        // console.log(res.data);
        setSalePersons(res.data)
        setIsLoading(false)
      }).catch(err => console.log(err))
  }, [])
  return (
    <div className='container'>
      <div className="row ">
        <div className="col-12">
          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="text-info">SalesPersons List</h2>
              <button type='button' className='btn btn-warning btn-sm' onClick={() => { if (spId) navigate(`/update_sales_person`, { state: { spId } }); else { alert('Please select salesPerson to edit!') } }}>Edit</button>
            </div>
            <div className="card-body sp-list">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Sl.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>MobileNo</th>
                        <th>AltMblNo</th>
                        <th>Target</th>
                        <th>Frequency</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        salePersons && salePersons.map((sp, index) => {
                          return (
                            <tr key={sp.salespersonId}>
                              <td><input type="radio" value={sp.salespersonId} onChange={changeHandler} name="opp_select" id="opp_select" /></td>
                              <td>{index + 1}</td>
                              <td>{sp.user.userName}</td>
                              <td>{sp.user.email}</td>
                              <td>{sp.user.mobileNo}</td>
                              <td>{sp.user.altMobileNo}</td>
                              <td>{sp.target}</td>
                              <td>{sp.frequency}</td>
                              <td>{sp.amount}</td>
                              <td>{sp.currency}</td>
                              <td>{sp.duration}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesPersonList