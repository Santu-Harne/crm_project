import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../util/api'

const OpportunitySubList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [oppSubList, setOppSubList] = useState(null)
  const { oppId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/app/getAllOpportunitySubByOpportunity/${oppId}`)
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
              <button className='btn btn-warning' onClick={() => navigate(`/opportunities_list`)}>Opp_List</button>
            </div>
            <div className="card-body oppSub-table">
              {isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Sl.No</th>
                      <th>OppCreatedDate</th>
                      <th>No.Of Installments</th>
                      <th>Price</th>
                      <th>Duration</th>
                      <th>Currency</th>
                      <th>Status Value</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oppSubList.map((oppSub, index) => {
                      return (
                        <tr key={oppSub.opportunitySubId}>
                          <td>{index + 1}</td>
                          <td>{oppSub.opportunityCreatedDate}</td>
                          <td>{oppSub.noOfInstallements}</td>
                          <td>{oppSub.price}</td>
                          <td>{oppSub.duration}</td>
                          <td>{oppSub.currency}</td>
                          <td>{oppSub.status.statusValue}</td>
                          <td className='text-center'><button className='btn btn-secondary btn-sm' onClick={() => navigate(`/oppSub_update/${oppId}/${oppSub.opportunitySubId}`)}>Edit</button></td>
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