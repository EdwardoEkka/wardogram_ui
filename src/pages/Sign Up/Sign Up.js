import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupForm = () => {
  return (
    <div className="col-12 d-flex justify-content-center align-items-center">
      <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 mt-5">
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            username: Yup.string().min(3, "Username must be at least 3 characters").required("Required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/create`, values)
              .then(response => {
                console.log(response.data);
                // Handle success (e.g., redirect to login page, show success message)
              })
              .catch(error => {
                console.error(error);
                if (error.response && error.response.data) {
                  setErrors({ email: error.response.data.message });
                } else {
                  setErrors({ email: "An unexpected error occurred" });
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="form-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="form-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="form-danger" />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
