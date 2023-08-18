import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import api from '../util/api'

const OpportunitySubList = () => {
  const [oppSubId, setOppSubId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [oppSubList, setOppSubList] = useState(null)

  const { state } = useLocation()
  const navigate = useNavigate()


  const changeHandler = (e) => {
    setOppSubId(e.target.value)
  }
  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/app/getAllOpportunitySubByOpportunity/${state.oppId}`)
        .then(res => {
          // console.log(res.data);
          setOppSubList(res.data);
          setIsLoading(false)
        }).catch(err => console.log(err))
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="text-info">OpportunitySub List</h2>
              <div>
                <button className='btn btn-secondary btn-sm' onClick={() => { if (oppSubId) navigate(`/oppSub_update`, { state: { oppId: state.oppId, oppSubId } }); else { alert('Please select opportunitySub to edit!') } }}>Edit</button>
                <button className='ms-3 btn btn-warning btn-sm' onClick={() => navigate(`/opportunities_list`)}>Opp_List</button>
              </div>
            </div>
            <div className="card-body oppSub-table">
              {isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Sl.No</th>
                      <th>OppCreatedDate</th>
                      <th>No.Of Installments</th>
                      <th>Price</th>
                      <th>Duration</th>
                      <th>Currency</th>
                      <th>Status Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oppSubList.map((oppSub, index) => {
                      return (
                        <tr key={oppSub.opportunitySubId}>
                          <td>
                            <input type="radio" value={oppSub.opportunitySubId} onChange={changeHandler} name="oppSub_select" id="oppSub_select" />
                          </td>
                          <td>{index + 1}</td>
                          <td>{oppSub.opportunityCreatedDate}</td>
                          <td>{oppSub.noOfInstallements}</td>
                          <td>{oppSub.price}</td>
                          <td>{oppSub.duration}</td>
                          <td>{oppSub.currency}</td>
                          <td>{oppSub.status.statusValue}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpportunitySubList