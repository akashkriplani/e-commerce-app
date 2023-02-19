import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const [searchParams] = useSearchParams();
  const redirectUrl = '/' + (searchParams.get('redirect') || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirectUrl);
    }
  }, [userInfo, redirectUrl, navigate]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label></label>
          <div>
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
