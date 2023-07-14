import React, { useState } from 'react'

const Input = (props) => {
  const {
    name,
    type,
    formData,
    setFormData,
    lableName
  } = props

  // console.log(setFormData)

  const inputHandler = (e) => {
    const { value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  }
  return (
    <div>
      <label className="form-label">{lableName}</label>
        <input type={type} name={name} onChange={(e) => inputHandler(e)} className="form-control" />
    </div>
  )
}

export default Input