import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState(''); // ✅ Store user email

  // ✅ Screen 1 - Email Form Validation
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  // ✅ Submit Email for Reset Link (we store the email here for later use)
  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      setEmail(values.email); // ✅ Save email
      setEmailSent(true); // Proceed to password screen
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to proceed');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Screen 2 - Password Reset Form Validation
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

  // ✅ Submit New Password
  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const payload = {
        email: email, // ✅ 
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      await api.put('/user/changePassword', payload);
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
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          validationSchema={passwordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form>

              
              <div className="mb-3">
                <label>Current Password</label>
                <Field type="password" name="currentPassword" className="form-control" />
                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>New Password</label>
                <Field type="password" name="newPassword" className="form-control" />
                <ErrorMessage name="newPassword" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Confirm New Password</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-success" >
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
