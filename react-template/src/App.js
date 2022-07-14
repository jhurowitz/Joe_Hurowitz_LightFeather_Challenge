import React, { useEffect } from 'react';
import './App.css';
import { useState } from "react";

function App() {
  
  const [supervisors, setSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailCheckBoxChecked, setEmailCheckBox] = useState(false);
  const [phoneCheckBoxChecked, setPhoneCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (supervisors.length === 0) {
      fetch('http://localhost:8080/api/supervisors')
      .then((response) => response.json())
      .then((supervisor) => { 
        setSupervisors(supervisor)
      })
    }
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
      document.getElementById('email').setAttribute('disabled', '');
      setEmail('');
    } 
    else {
      setEmailCheckBox(true)
      document.getElementById('email').removeAttribute('disabled');
    }
  }

  var handlePhoneCheckBox = (e) => {
    if (phoneCheckBoxChecked) {
      setPhoneCheckBox(false)
      document.getElementById('phone').setAttribute('disabled', '');
      setPhone('');
    } 
    else {
      setPhoneCheckBox(true)
      document.getElementById('phone').removeAttribute('disabled');
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
    fetch('http://localhost:8080/api/submit', {
      method : 'POST',
      headers : { 'Content-type' : 'application/json; charset=UTF-8' }, 
      body : JSON.stringify({ firstName, lastName, emailCheckBoxChecked, email, phoneCheckBoxChecked, phone, supervisor })
    })
    .then((response) => { return response.json() })

    alert('Thank you for your submission!');
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
        />
        <label htmlFor='lastName'><span className='required'>Last Name *</span></label>
        <input 
          required
          className='input-field'
          type='text'
          name='lastName'
          onChange={handleLastNameChange}
          value={lastName}
        />
        <p>How would you prefer to be notified?</p>
        <label htmlFor='email'><span>Email</span></label>
        <input 
          disabled
          required={emailCheckBoxChecked}
          className='input-field'
          type='email'
          name='email'
          id='email'
          onChange={handleEmailChange}
          value={email}
        />
        <input 
          type='checkbox'
          name='emailCheckBox'
          onChange={handleEmailCheckBox}
        />
        <label htmlFor='phone'><span>Phone number</span></label>
        <input 
          disabled
          required={phoneCheckBoxChecked}
          className='input-field'
          type='text'
          name='phone'
          id='phone'
          onChange={handlePhoneNumberChange}
          value={phone}
        />
        <input 
          type='checkbox'
          name='phoneNumberCheckBox'
          onChange={handlePhoneCheckBox}
        />
        <label htmlFor='supervisorsDropDown'><span>Supervisors</span></label>
        <select required className='select-field' name='supervisorsDropDown' value={supervisor} onChange={handleSupervisorChange}>
          <option key='baseOption'></option>
          { 
            supervisors.map((sup) => { 
              return <option text='text' key={sup}>{sup}</option> 
            }) 
          }
        </select>
        <br/>
        <label><span></span><button name='submit'>Submit</button></label>
      </form>
      </div>
    </div>
  );
}

export default App;
