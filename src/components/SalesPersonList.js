import React, { useEffect, useState } from 'react'
import api from '../util/api'
import { useNavigate } from 'react-router-dom'

const SalesPersonList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [spId, setSpId] = useState(null)
  const [salePersons, setSalePersons] = useState(null)
  const [salesPersonsList, setSalesPersonsList] = useState(null)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setSpId(e.target.value)
  }

  const nameSearchHandler = (e) => {
    if (e.target.value.length > 2) {
      let regExp = new RegExp(`^${e.target.value}`, 'i')
      setSalePersons(salesPersonsList.filter(sp => {
        const user = sp.user;
        return (
          //  === regExp
          regExp.test(user.userName.toLowerCase())
        );
      }))
    }
    if (e.target.value.length < 3) {
      setSalePersons(salesPersonsList)
    }
  }

  useEffect(() => {
    api.get('/app/getAllSalesPerson')
      .then(res => {
        // console.log(res.data);
        setSalePersons(res.data)
        setSalesPersonsList(res.data)
        setIsLoading(false)
      }).catch(err => console.log(err))
  }, [])
  return (
    <div className='mx-3'>
      <div className="row ">
        <div className="col-12">
          <div className="card mt-4">
            <div className="card-header d-flex flex-wrap  justify-content-between align-items-center">
              <div className='d-flex flex-wrap'>
                <h2 className="text-info me-3">SalesPersons List</h2>
                <div className='d-flex align-items-center '>
                  <input type="text" name="sp-name" id="sp-name" className='form-control' list='sp_name' onChange={nameSearchHandler} placeholder='Search by SalesPerson name' />
                  {/* <datalist id='sp_name'>
                    {
                      salePersons && salePersons.map((sp, index) => {
                        return (
                          <option key={sp.salespersonId} value={sp.user.userName}>{sp.user.userName}</option>
                        )
                      })
                    }
                  </datalist> */}
                </div>
              </div>
              <button type='button' className='btn btn-warning btn-sm' onClick={() => { if (spId) navigate(`/update_sales_person`, { state: { spId } }); else { alert('Please select salesPerson to update details!') } }}>Update</button>
            </div>
            <div className="card-body sp-list">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Sl.No</th>
                        <th>Name <i className="fa-solid fa-sort"></i></th>
                        <th>Email</th>
                        <th>MobileNo</th>
                        <th>AltMblNo</th>
                        <th>Max Target</th>
                        <th>Frequency</th>
                        <th>Threshold</th>
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
                              <td>{sp.maxTarget}</td>
                              <td>{sp.frequency}</td>
                              <td>{sp.threshold}</td>
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