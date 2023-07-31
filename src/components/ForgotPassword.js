import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState = { email: '', otp: '', newPassword: '', confirmPassword: '' }
const ForgotPassword = () => {
	const [userDetails, setUserDetails] = useState(initialState)
	const [verified, setVerified] = useState(false)

	const changeHandler = (e) => {
		const { name, value } = e.target
		setUserDetails({ ...userDetails, [name]: value })
	}

	const mailHandler = () => {
		axios.post(`/forget/forgetPassword/${userDetails.email}`)
			.then(res => {
				toast.success('Otp sent successfully')
				console.log(res);
			}).catch(err => toast.error(err.response.data))
	}
	const verifyHandler = () => {
		axios.post(`/forget/verify/${userDetails.otp}`)
			.then(res => {
				setVerified(!verified)
				toast.success('OTP verified successfully')
				setUserDetails({ ...userDetails, otp: '' })
			}).catch(err => toast.error(err.response.message))
	}

	const resetHandler = (e) => {
		e.preventDefault()
		axios.put(`/forget/changePassword/${userDetails.email}/${userDetails.newPassword}/${userDetails.confirmPassword}`)
			.then(res => {
				setUserDetails(initialState)
				toast.success('Password reset successfully')
			}).catch(err => console.log(err.message))
	}
	const showPassword = (inputId) => {
		const input = document.getElementById(inputId)
		if (input.type === 'password') input.type = 'text'
		else input.type = 'password'
	}

	return (
		<div className='container'>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card mt-5">
						<div className="card-header">
							<h2 className='text-info'>Reset Password</h2>
						</div>
						<div className="card-body">
							<div className='input-group mb-4'>
								<label htmlFor="email" className='input-group-text'>Email</label>
								<input type="email" value={userDetails.email} onChange={changeHandler} name="email" id="email" className='form-control' />
								<button className='btn btn-info text-nowrap' onClick={mailHandler}>Send OTP</button>
							</div>
							<div className="d-flex">
								<div className="input-group">
									<label htmlFor="otp" className='input-group-text'>Enter OTP</label>
									<input type="text" value={userDetails.otp} onChange={changeHandler} className='form-control-sm' size={6} name='otp' id='otp' />
									<button className='btn btn-sm btn-success' onClick={verifyHandler}>Verify</button>
								</div>
								<i className={`bi bi-check-circle-fill ${verified ? 'text-success' : "text-secondary"}`}></i>
							</div>
						</div>
						{
							verified ? (
								<form onSubmit={resetHandler}>
									<div className="card-footer">
										<div className="input-group mt-4">
											<label htmlFor="newPassword" className='input-group-text'>New Password</label>
											<input type="password" value={userDetails.newPassword} onChange={changeHandler} name="newPassword" id="newPassword" className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
											<span type='button' onClick={() => showPassword('newPassword')}><i className="bi bi-eye-fill"></i></span>
										</div>
										<div className="input-group my-3">
											<label htmlFor="confirmPassword" className='input-group-text'>Confirm Password</label>
											<input type="password" value={userDetails.confirmPassword} onChange={changeHandler} name="confirmPassword" id="confirmPassword" className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
											<span type='button' onClick={() => showPassword('confirmPassword')}><i className="bi bi-eye-fill"></i></span>
										</div>
										<button type='submit' className='btn btn-success reset_password'>Reset Password</button>
									</div>
								</form>
							) : ''
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword