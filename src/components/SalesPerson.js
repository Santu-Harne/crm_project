import React, { useState } from 'react'

const initialState = { Target: '', Frequency: '', Amount: '', Currency: '', Duration: '' }

const SalesPerson = () => {
	const [sales_person_details, setSales_person_details] = useState(initialState)


	const changeHandler = (e) => {
		const { name, value } = e.target
		setSales_person_details({ ...sales_person_details, [name]: value })
	}
	const clearHandler = () => {
		if (window.confirm('Are you sure to clear fields?')) setSales_person_details(initialState)
	}
	const submitHandler = (e) => {
		e.preventDefault()
		console.log(sales_person_details);
		setSales_person_details(initialState)
	}
	return (
		<div className='container'>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card mt-5">
						<div className="card-header"><h2>Sales Person</h2></div>
						<div className="card-body">
							<form onSubmit={submitHandler}>
								<div className="form-group">
									<label htmlFor="Target">Target</label>
									<input type="text" value={sales_person_details.Target} onChange={changeHandler} name="Target" id="Target" className='form-control' />
								</div>
								<div className="form-group">
									<label htmlFor="Frequency">Frequency</label>
									<input type="text" value={sales_person_details.Frequency} onChange={changeHandler} name="Frequency" id="Frequency" className='form-control' />
								</div>
								<div className="form-group">
									<label htmlFor="Amount">Amount</label>
									<input type="text" value={sales_person_details.Amount} onChange={changeHandler} name="Amount" id="Amount" className='form-control' />
								</div>
								<div className="form-group">
									<label htmlFor="Currency">Currency</label>
									<input type="text" value={sales_person_details.Currency} onChange={changeHandler} name="Currency" id="Currency" className='form-control' />
								</div>
								<div className="form-group">
									<label htmlFor="Duration">Duration</label>
									<input type="text" value={sales_person_details.Duration} onChange={changeHandler} name="Duration" id="Duration" className='form-control' />
								</div>
								<div className="form-group mt-3">
									<input type="submit" value={'Submit'} className='btn btn-success me-3' />
									<button className='btn btn-secondary' onClick={clearHandler}>clear</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SalesPerson