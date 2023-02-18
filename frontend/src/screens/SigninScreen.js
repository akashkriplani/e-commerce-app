import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
          <label></label>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label></label>
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
