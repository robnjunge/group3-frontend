import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
    name: '',
    email: '',
    isSigningUp: false,
    error: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().when('isSigningUp', {
      is: true,
      then: Yup.string().required('Name is required'),
    }),
    email: Yup.string().when('isSigningUp', {
      is: true,
      then: Yup.string().email('Invalid email').required('Email is required'),
    }),
  });

  const [error, setError] = useState('');

  const handleSignup = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5555/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Successfully signed up!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to sign up.');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to sign up. Please try again later.');
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Successfully logged in!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to log in.');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to log in. Please try again later.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setError('');
        if (values.isSigningUp) {
          handleSignup(values);
        } else {
          handleLogin(values);
        }
      }}
    >
      {({ values }) => (
        <Form className="login-form">
          <label>
            Username:
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" className="error-message" />
          </label>

          <label>
            Password:
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </label>

          {values.isSigningUp && (
            <div className="signup-fields">
              <label>
                Name:
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </label>

              <label>
                Email Address:
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </label>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit">{values.isSigningUp ? 'Sign Up' : 'Login'}</button>

          <button type="button" onClick={() => values.isSigningUp = !values.isSigningUp}>
            {values.isSigningUp ? 'Switch to Login' : 'Switch to Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
