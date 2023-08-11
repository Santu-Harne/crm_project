import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    if (window.confirm('Are you sure to log out?')) {
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
      window.location.href = '/login'
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><h3>Kloc-CRM</h3></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className='nav-link' to={'/login'}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/admin/users_list/user_0006'}>Usr_List</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/user_register'}>Reg_User</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/update_user/user_0006'}>Update_User</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/reset_password'}>Res_Password</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/admin/updateRoleReporting/user_0025/user_0006'}>UpdBy_Admin</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/update_sales_person/Sp_0001'}>Update_SP</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/opportunity'}>Create_Opp</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/opportunities_list'}>Opp_List</Link>
              </li>
              <li className="nav-item">
                <button className='btn btn-secondary' onClick={logoutHandler}>Logout <i className="fa-solid fa-lock"></i></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar