import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SalesPerson from './components/SalesPerson';
import Opportunity from './components/Opportunity';
import ProtectedRoute from './middleware/ProtectedRoute';
import UpdateUser from './components/UpdateUser';
import ResetPassword from './components/ResetPassword';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Login />} />
            <Route path='/user_register' element={<UserRegister />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='/sales_person' element={<SalesPerson />} />
            <Route path='/opportunity' element={<Opportunity />} />
            <Route path='/update_user' element={<UpdateUser />} />
            <Route path='/reset_password' element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
