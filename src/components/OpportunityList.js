import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate } from 'react-router-dom'

const OpportunityList = () => {
  const allOpp = []
  const [opportunities, setOpportunities] = useState(null)
  const [opportunitySub, setOpportunitySub] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  if (opportunities && opportunitySub) {
    for (let i = 0; i < opportunities.length; i++) {
      allOpp[i] = { ...opportunities[i], ...opportunitySub[i] }
    }
    console.log(allOpp);
  }
  useEffect(() => {
    const initialFetch = async () => {
      try {
        await api.get('/app/getAllOpportunities')
          .then(res => {
            // console.log(`Opportunities`, res.data);
            setOpportunities(res.data)
          }).catch(err => console.log(err))
        await api.get('/app/getAllOpportunitySub')
          .then(res => {
            // console.log(`OpportunitySub`, res.data);
            setOpportunitySub(res.data)
          })
        setIsLoading(false)
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
            <div className="card-header">
              <h2 className="text-info">Opportunity List</h2>
            </div>
            <div className="card-body opportunities-list">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) :
                  (<table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>OppName</th>
                        <th>OppSize</th>
                        <th>ContactName</th>
                        <th>ContactEmail</th>
                        <th>OfferingName</th>
                        <th>OffValid</th>
                        <th>Opp_created</th>
                        {/* <th>Opp Type</th> */}
                        <th>Installments</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Currency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {opportunities && opportunities.map((opp, index) => {
                        return (
                          <tr key={index}>
                            <td>{opp.opportunityName}</td>
                            <td>{opp.opportunitySize}</td>
                            <td>{opp.contact.firstName} {opp.contact.lastName}</td>
                            <td>{opp.contact.email}</td>
                            <td>{opp.offering.offeringName}</td>
                            <td>{opp.offering.validTillDate}</td>
                          </tr>
                        )
                      })} */}
                      {
                        allOpp && allOpp.map((opp, index) => {
                          return (
                            <tr key={opp.opportunityId}>
                              <td>{opp.opportunityId}</td>
                              <td>{opp.opportunityName}</td>
                              <td>{opp.opportunitySize}</td>
                              <td>{opp.contact.firstName} {opp.contact.lastName}</td>
                              <td>{opp.contact.email}</td>
                              <td>{opp.offering.offeringName}</td>
                              <td>{opp.offering.validTillDate}</td>
                              <td>{opp.opportunityCreatedDate}</td>
                              {/* <td>{opp.status.statusValue}</td> */}
                              <td>{opp.noOfInstallements}</td>
                              <td>{opp.price}</td>
                              <td>{opp.duration}</td>
                              <td>{opp.currency}</td>
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