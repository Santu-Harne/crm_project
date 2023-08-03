import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
                <Link className='nav-link' to={'/user_register'}>Reg_User</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/reset_password'}>Res_Password</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/opportunity'}>Opportunity</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to={'/update_user'}>Update_User</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar