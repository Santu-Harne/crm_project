import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const initialState = {
	email: 'santosh.283143@gmail.com',
	password: 'Santosh@123'
}

const Login = () => {
	const [user, setUser] = useState(initialState)
	const navigate = useNavigate()

	const changeHandler = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}
	const clearHandler = () => {
		if (window.confirm('Are you sure you want to clear all fields?')) setUser({ ...user, email: '', password: '' })
	}
	// function to show and hide password field
	const showPassword = (inputId) => {
		const input = document.getElementById(inputId)
		const eye = document.getElementById('eye-symbol')
		if (input.type === 'password') {
			input.type = 'text'
			eye.classList.remove('bi-eye-fill')
			eye.classList.add('bi-eye-slash-fill')
		}
		else {
			input.type = 'password'
			eye.classList.remove('bi-eye-slash-fill')
			eye.classList.add('bi-eye-fill')
		}
	}

	// function to call login api
	const submitHandler = async (e) => {
		e.preventDefault()
		await axios.post('/auth/login', user)
			.then(res => {
				// console.log(res.data);
				localStorage.setItem('token', res.data.jwtToken)
				toast.success('Login successful')
				setUser(initialState)
				navigate(`/user_dashboard/${res.data.userId}`)
			}).catch(error => {
				// console.log(error.message);
				toast.error('Error while login, Please try after some time!')
			})
	}
	return (
		<div className='container'>
			<div className="row d-flex justify-content-center">
				<div className="col-md-6 col-10 ">
					<div className="card mt-5">
						<div className="card-header">
							<h2 className='text-info'>Login</h2>
						</div>
						<div className="card-body">
							<form onSubmit={submitHandler} className='user_form'>
								<div className="form-group mt-3">
									<label htmlFor="email">Email <span className='required'>*</span></label>
									<input type="email" name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
								</div>
								<div className="form-group mt-3">
									<label htmlFor="password">Password <span className='required'>*</span></label>
									<input type="password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' required />
									<span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
								</div>
								<div className='forgot_password' type='button' onClick={() => navigate('/forgot_password')}>
									Forgot Password
								</div>
								<div className="col-12 mt-5 text-center">
									<div className="input-group d-flex justify-content-center">
										<button type='submit' className='btn  btn-success'>Login <i className="fa-solid fa-lock-open"></i></button>
										<button className='btn btn-secondary' onClick={clearHandler}>Clear <i className="fa-solid fa-rotate"></i></button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Login