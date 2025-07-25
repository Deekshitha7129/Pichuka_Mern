import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/auth/login', { email, password })
      .then(result => {
        console.log(result)
        if (result.data.message === "Success") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userName", result.data.user.name);
          navigate('/home')
        }
      })
      .catch(err => console.log(err))
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              id='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              id='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Login
          </button>
        </form>
        <p className="mt-3">Don&apos;t have an account?</p>
        <Link to="/register" className='btn btn-light w-100 rounded-0 text-decoration-none'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login;
