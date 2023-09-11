import React from 'react'
import { Route } from 'react-router-dom'
import UserDashboard from '../components/UserDashboard'
import UserList from '../components/UserList'
import UserRegister from '../components/UserRegister'
import SalesPersonList from '../components/SalesPersonList'
import UpdateSalesPerson from '../components/UpdateSalesPerson'
import UpdateOppSub from '../components/Opportunity/UpdateOppSub'
import UpdateUser from '../components/UpdateUser'
import UpdateUserByAdmin from '../components/UpdateUserByAdmin'
import StatusUpdate from '../components/StatusUpdate'
import ResetPassword from '../components/ResetPassword'
import OpportunityList from '../components/Opportunity/OpportunityList'
import OpportunitySubList from '../components/Opportunity/OpportunitySubList'
import CreateVendorAndPartner from '../components/VendorsAndPertners/CreateVendorAndPartner'
import UpdateVendorAndContact from '../components/VendorsAndPertners/UpdateVendorAndContact'
import AllVendorsAndPartnersList from '../components/VendorsAndPertners/AllVendorsAndPartnersList'
import ProtectedRoute from '../middleware/ProtectedRoute'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword'

const routes = (
  <>
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Login />} />
    <Route path='/forgot_password' element={<ForgotPassword />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/user_dashboard' element={<UserDashboard />} />
      <Route path='/admin/users_list/:adminId' element={<UserList />} />
      <Route path='/user_register' element={<UserRegister />} />
      <Route path='/salesPersons_list' element={<SalesPersonList />} />
      <Route path='/update_sales_person' element={<UpdateSalesPerson />} />
      <Route path='/opportunity_update' element={<UpdateOppSub />} />
      <Route path='/update_user/:userId' element={<UpdateUser />} />
      <Route path='/admin/updateRoleReporting/:adminId/:userId' element={<UpdateUserByAdmin />} />
      <Route path='/admin/statusUpdate/:adminId/:userId' element={<StatusUpdate />} />
      <Route path='/reset_password' element={<ResetPassword />} />
      <Route path='/opportunities_list' element={<OpportunityList />} />
      <Route path='/opportunitySub_list' element={<OpportunitySubList />} />
      <Route path='/createContact' element={<CreateVendorAndPartner />} />
      <Route path='/updateContact' element={<UpdateVendorAndContact />} />
      <Route path='/allContactList' element={<AllVendorsAndPartnersList />} />
    </Route>
  </>
)
export default routes

