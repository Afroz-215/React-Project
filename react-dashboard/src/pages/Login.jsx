import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  //  Validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too short!').required('Required'),
  });

  //  Submit handler
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log('Sending login request with:', values);
      const res = await api.post('/login', values);
      console.log('Login response:', res.data);

      // Save token (optional, depends on backend response)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <Formik
        initialValues={{ email: 'john@example.com', password: 'Password@123' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

             {/* Forgot password link */}
            <div className="mb-3 text-end">
              <Link to="/forget-password">Forgot Password?</Link>
            </div>


            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
