import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate } from 'react-router-dom'

const OpportunityList = () => {
  const [oppId, setOppId] = useState(null)
  const [opportunities, setOpportunities] = useState(null)
  const [opportunities_list, setOpportunities_list] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setOppId(e.target.value)
  }
  const contactSearchHandler = (e) => {
    if (e.target.value.length > 2) {
      let regExp = new RegExp(`^${e.target.value}`, 'i')
      setOpportunities(opportunities_list.filter(opportunity => {
        const contact = opportunity.contact;
        return (
          //  === regExp
          regExp.test(contact.firstName.toLowerCase())
        );
      }))
    }
    if (e.target.value.length < 3) {
      setOpportunities(opportunities_list)
    }
  }
  const offeringSearchHandler = (e) => {
    if (e.target.value.length > 2) {
      let regExp = new RegExp(`^${e.target.value}`, 'i')
      setOpportunities(opportunities_list.filter(opportunity => {
        const offering = opportunity.offering;
        return (
          //  === regExp
          regExp.test(offering.offeringName.toLowerCase())
        );
      }))
    }
    if (e.target.value.length < 3) {
      setOpportunities(opportunities_list)
    }
  }
  useEffect(() => {
    const initialFetch = async () => {
      try {
        await api.get('/app/getAllOpportunities')
          .then(res => {
            // console.log(res.data);
            setOpportunities_list(res.data)
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
            <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
              <div className='d-flex flex-wrap'>
                <h2 className="text-info me-3">Opportunity List</h2>
                <div className='d-flex align-items-center '>
                  <input onChange={contactSearchHandler} type="text" name='contact-name' id='contact-name' className='form-control' list='contact_name' placeholder='Search by contact name' />
                  <datalist id='contact_name'>
                    {
                      opportunities_list && opportunities_list.map((item, index) => {
                        return (
                          <option key={index} value={item.contact.firstName}>{item.contact.firstName}</option>
                        )
                      })
                    }
                  </datalist>
                  <input onChange={offeringSearchHandler} type="text" name='offering-name' id='offering-name' className='form-control ms-3' placeholder='Search by offering name' list='offering_name' />
                  <datalist id='offering_name'>
                    {
                      opportunities_list && opportunities_list.map((item, index) => {
                        return (
                          <option key={index} value={item.offering.offeringName}>{item.offering.offeringName}</option>
                        )
                      })
                    }
                  </datalist>
                </div>
              </div>
              <button type='button' className='btn btn-warning btn-sm mt-3' onClick={() => { if (oppId) navigate(`/opportunitySub_list`, { state: { oppId } }); else { alert('Please select opportunity to see Opportunity Details!') } }}>Opp Details</button>
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
                      </tr>
                    </thead>
                    <tbody>
                      {
                        opportunities && opportunities.map((opp, index) => {
                          return (
                            <tr key={opp.opportunityId}>
                              <td><input type="radio" value={opp.opportunityId} onChange={changeHandler} name="opp_select" id="opp_select" /></td>
                              {/* <td>{opp.opportunityId}</td> */}
                              <td>{index + 1}</td>
                              <td>{opp.opportunityName}</td>
                              <td>{opp.opportunitySize}</td>
                              <td>{opp.contact.firstName} {opp.contact.lastName}</td>
                              <td>{opp.contact.email}</td>
                              <td>{opp.offering.offeringName}</td>
                              <td>{opp.offering.validTillDate}</td>
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