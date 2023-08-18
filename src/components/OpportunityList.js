import React, { useState, useEffect, useCallback, useMemo } from 'react'
import api from '../util/api'
import { useNavigate, Navigate } from 'react-router-dom'

const OpportunityList = () => {
  const [oppId, setOppId] = useState(null)
  const [opportunities, setOpportunities] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setOppId(e.target.value)
    console.log(e.target.value);
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await api.get('/app/getAllOpportunities')
          .then(res => {
            // console.log(`Opportunities`, res.data);
            setOpportunities(res.data)
            setIsLoading(false)
          }).catch(err => console.log(err))
      } catch (error) {
        console.log(error.message);
      }
    }
    initialFetch()
  }, [])
  return (
    <div className='mx-3'>
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="text-info">Opportunity List</h2>
              <button type='button' className='btn btn-warning btn-sm' onClick={() => { if (oppId) navigate(`/update_opportunity`, { state: { oppId: oppId } }); else { alert('Please select opportunity to edit!') } }}>Edit</button>
            </div>
            <div className="card-body opportunities-list">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) :
                  (<table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Sl.No</th>
                        <th>OppName</th>
                        <th>OppSize</th>
                        <th>ContactName</th>
                        <th>ContactEmail</th>
                        <th>OfferingName</th>
                        <th>OffValid</th>
                        <th>OppSub</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        opportunities && opportunities.map((opp, index) => {
                          return (
                            <tr key={opp.opportunityId}>
                              <td><input type="radio" value={opp.opportunityId} onChange={changeHandler} name="opp_select" id="opp_select" /></td>
                              <td>{opp.opportunityId}</td>
                              <td>{opp.opportunityName}</td>
                              <td>{opp.opportunitySize}</td>
                              <td>{opp.contact.firstName} {opp.contact.lastName}</td>
                              <td>{opp.contact.email}</td>
                              <td>{opp.offering.offeringName}</td>
                              <td>{opp.offering.validTillDate}</td>
                              <td>
                                <button type='button' className='btn btn-warning btn-sm' onClick={() => navigate(`/opportunitySub_list`, { state: { oppId: opp.opportunityId } })}>SubList</button>
                              </td>
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
    </div>
  )
}

export default OpportunityList