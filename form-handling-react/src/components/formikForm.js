// src/components/formikForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form Submitted:", values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div>
      <h2>User Registration (Formik Form)</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <label>Username: </label>
              <Field type="text" name="username" value={values.username} />
              <ErrorMessage name="username" component="p" style={{ color: "red" }} />
            </div>

            <div>
              <label>Email: </label>
              <Field type="email" name="email" value={values.email} />
              <ErrorMessage name="email" component="p" style={{ color: "red" }} />
            </div>

            <div>
              <label>Password: </label>
              <Field type="password" name="password" value={values.password} />
              <ErrorMessage name="password" component="p" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
