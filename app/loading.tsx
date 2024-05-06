import React from 'react'
import './loading.css'

export default function page() {
  return (
    <main className='grid place-items-center p-4 my-16'>
      <div className="loader">
        <div className="circle">
          <div className="dot" />
          <div className="outline" />
        </div>
        <div className="circle">
          <div className="dot" />
          <div className="outline" />
        </div>
        <div className="circle">
          <div className="dot" />
          <div className="outline" />
        </div>
        <div className="circle">
          <div className="dot" />
          <div className="outline" />
        </div>
      </div>
    </main>
  )
}
