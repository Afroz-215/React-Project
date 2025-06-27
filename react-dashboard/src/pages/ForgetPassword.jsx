import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string()
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .min(8, 'At least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Required'),
  });

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      setEmail(values.email);
      setEmailSent(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to proceed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (values, { setSubmitting }) => {
    console.log('Token in localStorage for password reset:', localStorage.getItem('token'));

    try {
      const token = localStorage.getItem('token');

      const payload = {
        email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      await api.put('/user/changePassword', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <h2 className="mb-4 text-center">
        {emailSent ? 'Reset Your Password' : 'Forgot Password'}
      </h2>

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
                <Field type="email" name="email" id="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={passwordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="currentPassword">Current Password</label>
                <Field
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="form-control"
                  value={values.currentPassword}
                  onChange={handleChange}
                />
                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword">New Password</label>
                <Field
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="form-control"
                  value={values.newPassword}
                  onChange={handleChange}
                />
                <ErrorMessage name="newPassword" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={isSubmitting}
              >
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
