import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './middleware/ProtectedRoute';
import UpdateUser from './components/UpdateUser';
import ResetPassword from './components/ResetPassword';
import NavBar from './components/NavBar';
import UserDashboard from './components/UserDashboard';
import UpdateUserByAdmin from './components/UpdateUserByAdmin';
import UpdateSalesPerson from './components/UpdateSalesPerson';
import UserList from './components/UserList';
import StatusUpdate from './components/StatusUpdate';
import OpportunityList from './components/OpportunityList';
import OpportunitySubList from './components/OpportunitySubList';
import UpdateOpportunity from './components/UpdateOpportunity';
import UpdateOppSub from './components/UpdateOppSub';


function App() {
  return (
    <div>
      <Router>
        <Toaster />
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Login />} />
            <Route path='/user_dashboard/:userId' element={<UserDashboard />} />
            <Route path='/admin/users_list/:adminId' element={<UserList />} />
            <Route path='/user_register' element={<UserRegister />} />
            <Route path='/update_sales_person/:sp_id' element={<UpdateSalesPerson />} />
            <Route path='/update_opportunity/:opportunityId' element={<UpdateOpportunity />} />
            <Route path='/oppSub_update/:oppId/:oppSubId' element={<UpdateOppSub />} />
            <Route path='/update_user/:userId' element={<UpdateUser />} />
            <Route path='/admin/updateRoleReporting/:adminId/:userId' element={<UpdateUserByAdmin />} />
            <Route path='/admin/statusUpdate/:adminId/:userId' element={<StatusUpdate />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/opportunities_list' element={<OpportunityList />} />
            <Route path='/opportunitySub_list/:oppId' element={<OpportunitySubList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
