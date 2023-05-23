import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './context/AuthContext';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const { loading, error, user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = 'https://novu.braga.com.ng';
  const [inputFields, setInputFields] = useState({
    username: '',
    password: '',
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
    setInputFields({
      ...inputFields,
      [e.target.name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      if (!inputFields.username || !inputFields.password) {
        Swal.fire({
          title: 'Login Failed',
          text: `Invalid username or Password`,
          icon: 'error',
        });
      }
      let data = {
        username: inputFields.username,
        password: inputFields.password,
      };
      const res = await axios.post(`${API_URL}/api/v1/auth/login`, data);
      if (res.data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        navigate('/');
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { message: `${error.message}` },
        });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };
  useEffect(() => {
    const verifyToken = () => {
      if (user) {
        const token = JSON.parse(localStorage.getItem('userInfo'));
        if (jwtDecode(token)?.exp < Date.now() / 1000) {
          localStorage.removeItem('userInfo');
          dispatch({ type: 'LOGOUT' });
        }
      }
    };
    verifyToken();
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <>
      <div className="container">
        <div className="flex items-center mx-auto w-[90%] md:w-1/3 md:py-10 h-screen">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full"
                  name="username"
                  value={inputFields.username}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  name="password"
                  value={inputFields.password}
                  onChange={handleFormChange}
                />
              </div>
              {error && <span className="text-[red]">{error.message}</span>}
              <button
                className="btn btn-primary mt-2"
                onClick={handleLogin}
                disabled={loading}
              >
                Login
              </button>
              <div className="flex gap-1">
                Don't have an account?{' '}
                <Link to="/register" className="underline text-primary">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
