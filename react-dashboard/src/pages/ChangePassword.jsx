import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert, Button, FormGroup, Label, Input } from "reactstrap";
import { StatusCodes } from "http-status-codes";
import axiosInstance from "../services/axiosInstance";

const ChangePassword = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = storedUser?.email || "";

  const initialValues = {
    email: userEmail,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Z]).{8,}$/,
        "Must contain one capital letter and be at least 8 characters long"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await axiosInstance.put("/user/changePassword", {
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      if (response.status === StatusCodes.OK) {
        setStatus({ success: "Password changed successfully!" });
        resetForm();
      }
    } catch (error) {
      console.error("Change password error:", error?.response?.data);
      setStatus({
        error:
          error?.response?.data?.message ||
          "Failed to change password. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Change Password</h3>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status?.success && <Alert color="success">{status.success}</Alert>}
            {status?.error && <Alert color="danger">{status.error}</Alert>}

            <FormGroup>
              <Label>Email</Label>
              <Field name="email" type="email" as={Input} placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </FormGroup>

            <FormGroup>
              <Label>Current Password</Label>
              <Field
                name="currentPassword"
                type="password"
                as={Input}
                placeholder="Enter current password"
              />
              <ErrorMessage name="currentPassword" component="div" className="text-danger" />
            </FormGroup>

            <FormGroup>
              <Label>New Password</Label>
              <Field
                name="newPassword"
                type="password"
                as={Input}
                placeholder="Enter new password"
              />
              <ErrorMessage name="newPassword" component="div" className="text-danger" />
            </FormGroup>

            <FormGroup>
              <Label>Confirm New Password</Label>
              <Field
                name="confirmPassword"
                type="password"
                as={Input}
                placeholder="Re-enter new password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </FormGroup>

            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Change Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
