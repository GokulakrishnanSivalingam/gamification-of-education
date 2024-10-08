import React, { useState } from 'react';
import './Authentation/Login.css'; 
import Navbar from './Navbar';''

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form Submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div > {/* Add class for the border container */}
   < Navbar/>
    <fieldset>
      <h1>Feedback Form</h1>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email">Email:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message:</label>  <br />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              cols={30}
            ></textarea>
          </div>
        <br/>
         <div className="auth"><button type="submit">Submit</button></div> 
        </form>
      )}
      </fieldset>
    </div>
  );
}



export default Feedback