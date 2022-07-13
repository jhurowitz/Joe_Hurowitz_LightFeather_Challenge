import React, { useEffect } from 'react';
import './App.css';
import { useState } from "react";

function App() {
  
  const [supervisors, setSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailCheckBoxChecked, setEmailCheckBox] = useState(true);
  const [phoneCheckBoxChecked, setPhoneCheckBox] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
      fetch('http://localhost:8080/api/supervisors')
      .then((response) => response.json())
      .then((supervisor) => { 
        setSupervisors(supervisor)
      })
  })

  const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  var handleEmailCheckBox = (e) => {
    if (emailCheckBoxChecked) {
      setEmailCheckBox(false)
    } 
    else {
      setEmailCheckBox(true)
    }
  }

  var handlePhoneCheckBox = (e) => {
    if (phoneCheckBoxChecked) {
      setPhoneCheckBox(false)
    } 
    else {
      setPhoneCheckBox(true)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePhoneNumberChange = (e) => {
    setPhone(e.target.value);
  }
  
  const handleSupervisorChange = (e) => {
    setSupervisor(e.target.value);
  }

  const handleFormSubmit = (e) => {
    console.log(JSON.stringify({ firstName, lastName, email, phone, supervisor }))
    fetch('http://localhost:8080/api/submit', {
      method : 'POST',
      headers : { 'Content-type' : 'application/json; charset=UTF-8' }, 
      body : JSON.stringify({ firstName })
    })
    .then((response) => response.json())
    .then((data) => alert(data))
  }

  return (
    <div className='App'>
      <div className='form-style-2'>
        <div className='form-style-2-heading'>Notification Form</div>
        <form onSubmit={handleFormSubmit}>
        <label htmlFor='firstName'><span className='required'>First Name *</span></label>
        <input 
          required
          className='input-field'
          type='text'
          name='firstName'
          onChange={handleFirstNameChange}
          value={firstName}
        /><br/>
        <label htmlFor='lastName'><span className='required'>Last Name *</span></label>
        <input 
          required
          className='input-field'
          type='text'
          name='lastName'
          onChange={handleLastNameChange}
          value={lastName}
        /><br/>
        <p>How would you prefer to be notified?</p>
        <label htmlFor='email'><span>Email</span></label>
        <input 
          className='input-field'
          type='email'
          name='email'
          onChange={handleEmailChange}
          value={email}
        />
        <input 
          type='checkbox'
          name='emailCheckBox'
          onChange={handleEmailCheckBox}
          required={emailCheckBoxChecked}
        />
        <label htmlFor='phone'><span>Phone number</span></label>
        <input 
          className='input-field'
          type='text'
          name='phone'
          onChange={handlePhoneNumberChange}
          value={phone}
        />
        <input 
          type='checkbox'
          name='phoneNumberCheckBox'
          onChange={handlePhoneCheckBox}
          required={phoneCheckBoxChecked}
        />
        <label htmlFor='supervisorsDropDown'><span>Supervisors</span></label>
        <select required className='select-field' name='supervisorsDropDown' onChange={handleSupervisorChange}>
          <option key='baseOption' value={supervisor}></option>
          { 
            supervisors.map((sup) => { 
              return <option text='text' key={sup} value={supervisor}>{sup}</option> 
            }) 
          }
        </select>
        <br/>
        <label><span> </span><input type="submit" value="Submit"/></label>
      </form>
      </div>
    </div>
  );
}

export default App;
