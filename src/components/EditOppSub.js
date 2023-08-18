import React, { useState, useEffect } from 'react'
import api from '../util/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditOppSub = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [oppSub, setOppSub] = useState(null)

  const { oppSubId } = useParams()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const initialFetch = async () => {
      // api.get(`/`)
    }
    initialFetch()
  }, [])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-info">Edit OppSub</h2>
            </div>
            <div className="card-body">
              {
                isLoading ? (<h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>) : (
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="target">Target</label>

                    </div>
                  </form>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditOppSub