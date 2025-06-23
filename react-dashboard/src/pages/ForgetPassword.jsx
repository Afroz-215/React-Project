import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [resetToken, setResetToken] = useState('');

  // ✅ Screen 1 - Email Form Validation
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  // ✅ Submit Email for Reset Link
  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await api.post('/forgot-password', values);
      setResetToken(res.data.token || ''); // Only if backend sends token
      setEmailSent(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Screen 2 - Password Reset Form Validation
  const passwordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Too short!').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  // ✅ Submit New Password
  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      await api.post('/reset-password', {
        token: resetToken,
        password: values.password,
      });
      alert('Password reset successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{emailSent ? 'Reset Your Password' : 'Forgot Password'}</h2>

      {!emailSent ? (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailSchema}
          onSubmit={handleEmailSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email">Email Address</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={passwordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="password">New Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ForgetPassword;
