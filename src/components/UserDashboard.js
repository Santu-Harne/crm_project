import React, { useState, useEffect } from 'react'
import api from '../util/api'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import AdminDashboard from './Dashboards/AdminDashboard'
import MarketingManagerDashboard from './Dashboards/MarketingManagerDashboard'
import SalesManagerDashboard from './Dashboards/SalesManagerDashboard'
import SupportingManagerDashboard from './Dashboards/SupportingManagerDashboard';

const UserDashboard = () => {
  // current user
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const token = localStorage.getItem('token')

  // roles
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMarketingManager, setIsMarketingManager] = useState(false)
  const [isSalesPerson, setIsSalesPerson] = useState(false)
  const [isSalesManager, setIsSalesManager] = useState(false)
  const [isSupportingManager, setIsSupportingManager] = useState(false)

  // const { userId } = useParams()
  const { state } = useLocation()

  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/api/getDtoById/${state.userId}`,)
        .then(res => {
          setCurrentUser(res.data)
          if (res.data.role === 'Administrator') setIsAdmin(true)
          if (res.data.role === 'Marketing Manager') setIsMarketingManager(true)
          if (res.data.role === 'SalesPerson') setIsSalesPerson(true)
          if (res.data.role === 'Sales Manager') setIsSalesManager(true)
          if (res.data.role === 'Supporting Manager') setIsSupportingManager(true)
          setIsLoading(false)
        }).catch(err => console.log(err))
      return {

      }
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <>
          {isLoading && <h3 >Loading... <i className="fa-solid fa-spinner fa-spin"></i></h3>}
          {isAdmin && <AdminDashboard user={currentUser} setIsAdmin={setIsAdmin} />}
          {isMarketingManager && <MarketingManagerDashboard user={currentUser} setIsMarketingManager={setIsMarketingManager} />}
          {isSalesManager && <SalesManagerDashboard user={currentUser} />}
          {isSalesPerson && <SalesManagerDashboard user={currentUser} />}
          {isSupportingManager && <SupportingManagerDashboard user={currentUser} />}
        </>
      </div>
    </div>
  )
}

export default UserDashboard
