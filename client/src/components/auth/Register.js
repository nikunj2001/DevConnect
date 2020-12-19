import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password != password2) setAlert('Password dont match', 'danger');
    else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            onChange={(e) => onChange(e)}
            placeholder='Name'
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            required
            onChange={(e) => onChange(e)}
            value={email}
            placeholder='Email Address'
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            onChange={(e) => onChange(e)}
            value={password2}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setAlert: () => {
//       dispatch(setAller('ohhhhhhhhhhh', 'danger'));
//     },
//   };
// };

export default connect(null, { setAlert })(Register);
