import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/axiosInstance';

const Login = () => {
  const navigate = useNavigate();

  // Validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too short!').required('Required'),
  });

  // Submit handler
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await api.post('/login', values);

      if (res?.data?.data) {
        const user = res.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h2 className="mb-4 text-center">Login</h2>

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

            <div className="mb-3 text-end">
              <Link to="/forget-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-3 text-center">
              <Link to="/changePassword">Go to Change Password</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
