import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const handleFormChange = (e) => {
    const value = e.target.value;
    setInputFields({
      ...inputFields,
      [e.target.name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !inputFields.username ||
      !inputFields.email ||
      !inputFields.phone ||
      !inputFields.password ||
      !inputFields.confirm_password
    ) {
      return false;
    } else {
      let formData = {
        username: inputFields.username,
        email: inputFields.email,
        password: inputFields.password,
        confirm_password: inputFields.confirm_password,
        phone: inputFields.phone,
        roles: [1500],
      };
      setLoading(true);
      const response = await axios.post(
        `https://novu.braga.com.ng/api/v1/auth/register`,
        formData
      );
      if (response.data.status === false) {
        setLoading(false);
        Swal.fire({
          title: 'Registration failed',
          text: `${response.data.message}`,
          icon: 'error',
        });
      } else {
        setLoading(false);
        navigate('/login');
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="flex items-center mx-auto w-[90%] md:w-1/3 py-10">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Register</h2>
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
                  <span className="label-text">Email address</span>
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="input input-bordered w-full"
                  name="email"
                  value={inputFields.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Phone number&nbsp;
                    <i className="text-[10px] text-[red]">
                      (include country code)
                    </i>
                  </span>
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="phone"
                  value={inputFields.phone}
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="input input-bordered w-full"
                  name="confirm_password"
                  value={inputFields.confirm_password}
                  onChange={handleFormChange}
                />
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={handleRegister}
                disabled={loading}
              >
                Register
              </button>
              <div className="flex gap-1">
                Already have an account?{' '}
                <Link to="/login" className="underline text-primary">
                  Login instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
