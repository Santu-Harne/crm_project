import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
    const token = localStorage.getItem('token')

    return (
        <React.Fragment>
            {
                token ? <Outlet /> : <Navigate to={'/login'} />
            }
        </React.Fragment>
    )
}

export default ProtectedRoute