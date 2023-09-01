import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../util/api'

const OpportunitySubList = () => {
  const [oppSubId, setOppSubId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [oppSubList, setOppSubList] = useState(null)
  const [opportunity, setOpportunity] = useState(null)

  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/app/${state.oppId}`)
        .then(res => {
          // console.log(res.data);
          setOpportunity(res.data)
        }).catch(err => console.log(err))

      await api.get(`/app/getAllOpportunitySubByOpportunity/${state.oppId}`)
        .then(res => {
          // console.log(res.data);
          setOppSubList(res.data);
          setOppSubId(res.data[0].opportunitySubId)
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
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
              <h2 className="text-info">Opportunity Details</h2>
              <div>
                {
                  oppSubList?.length === 1 && <button className='btn btn-secondary btn-sm' onClick={() => { if (oppSubId) navigate(`/opportunity_update`, { state: { oppId: state.oppId, oppSubId } }); else { alert('Please select opportunitySub to edit!') } }}>Edit</button>}
                <button className='ms-3 btn btn-warning btn-sm' onClick={() => navigate(`/opportunities_list`)}>Opp_List</button>
              </div>
            </div>
            <div className="card-body oppSub-table">

              {isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                <>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6"><h5><span className='text-secondary'>Opp Name : </span>{opportunity.opportunityName}</h5>
                        </div>
                        <div className="col-md-6"><h5><span className='text-secondary'>Opp Size : </span>{opportunity.opportunitySize}</h5></div>
                        {/* <div className="col-md-6"><h5><span className='text-secondary'>Contact Name : </span>{opportunity.contactSub["contactId"]["firstName"]} {opportunity.contactSub["contactId"]["lastName"]}</h5></div>
                        <div className="col-md-6"><h5><span className='text-secondary'>Contact Email : </span>{opportunity.contactSub["contactId"]["email"]}</h5></div> */}
                        <div className="col-md-6"><h5><span className='text-secondary'>Offering Name : </span>{opportunity.offering.offeringName}</h5></div>
                        <div className="col-md-6"><h5><span className='text-secondary'>Offering Validity : </span>{opportunity.offering.validTillDate}</h5></div>
                      </div>
                    </div>
                  </div>


                  <h4 className='text-secondary'>Sub Opportunities</h4>
                  <table className='table table-hover '>
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>OppCreatedDate</th>
                        <th>No. Of Installments</th>
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
                            <td>{index + 1}</td>
                            {/* <td>{oppSub.opportunitySubId}</td> */}
                            <td>{oppSub.opportunityStatusDate}</td>
                            <td>{oppSub.noOfInstallements}</td>
                            <td>{oppSub.price}</td>
                            <td>{oppSub.duration}</td>
                            <td>{oppSub.currency}</td>
                            <td>{oppSub.status.statusValue}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table></>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpportunitySubList