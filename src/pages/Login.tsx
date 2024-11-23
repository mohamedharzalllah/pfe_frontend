import  { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/login.css'; // Import your CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e:any) => {
    e.preventDefault(); // Prevent form from submitting the default way
    console.log('Logging in with:', email, password); // Debugging
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });
      console.log('Response:', response); // Debugging
      setMessage(response.data);
      localStorage.setItem('token', response.data);
    } catch (error:any ) {
      console.log(error.response.data.message);
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>{message}</p>
            <Link to="/signup">Don't have an account?</Link>
            <div>Forgotten password</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;