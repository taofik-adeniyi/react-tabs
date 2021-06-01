import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    try {
      setLoading(true)
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs)
    setLoading(false)
    }catch (error) {
      setLoading(false)
      setJobs([])
    }
  }

  useEffect(()=>{
    fetchJobs()
  },[])

  if(loading){
    return <section className="section loading">
      <h4>... loading ..</h4>
    </section>
  }

  
  const {company, duties, title, dates} = jobs[value]
  return (
    <section>
      <div className="title">
        <h2>experience</h2>
        <div className="underline" />
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {
            jobs.map((job, index)=>{
              return (
              <button 
                onClick={()=> setValue(index)} 
                type="button"
                className={`job-btn ${index === value && 'active-btn'}`}
                key={index}>
                {job.company}
              </button>)
            })
          }
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {
            duties.map((duty, index)=>{
              return <div className="job-desc" key={index}>
                <FaAngleDoubleRight />{duty}</div>
            })
          }
        </article>
      </div>
    </section>
  )
}

export default App
