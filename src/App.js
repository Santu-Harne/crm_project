import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SalesPerson from './components/SalesPerson';
import Opportunity from './components/Opportunity';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<UserRegister />} />
          <Route path='/user_register' element={<UserRegister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/sales_person' element={<SalesPerson />} />
          <Route path='/opportunity' element={<Opportunity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
