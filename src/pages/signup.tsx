import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: {}, email: {}, password: {} });

  const handleSignup = async () => {
    console.log('Signing up with:', name, email, password); // Debugging
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        name,
        email,
        password
      });
      console.log('Response:', response); // Debugging
      setMessage(response.data.message);
    } catch (error:any ) {
      if (error.response && error.response.data && error.response.data.message) {
        const responseErrors = error.response.data.message;
        console.log('Errors:', responseErrors); // Debugging
        setErrors({
          name: responseErrors.name || {},
          email: responseErrors.email || {},
          password: responseErrors.password || {}
        });
      } else {
        setMessage('Signup failed');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && Object.values(errors.name).map((msg:any, index) => (
          <p key={index} style={{ color: 'red' }}>{msg}</p>
        ))}
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="text" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && Object.values(errors.email).map((msg:any, index) => (
          <p key={index} style={{ color: 'red' }}>{msg}</p>
        ))}
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && Object.values(errors.password).map((msg:any, index) => (
          <p key={index} style={{ color: 'red' }}>{msg}</p>
        ))}
      </div>
      <p>{message}</p>
      <button onClick={handleSignup}>Signup</button>
      <h1><Link to='/login'>Already have an account</Link></h1>
    </div>
  );
};

export default Signup;