import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/actions/authActions";
import { Link } from "react-router-dom";

const SigninForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  return (
    <div className="col-12 d-flex justify-content-center align-items-center">
      <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 mt-5">
        <h2 className="mb-4 text-center">Sign In</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(login(values.email, values.password));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
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
              {authError && typeof authError === 'string' && <div className="form-danger">{authError}</div>}
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Submit
              </button>
              <div className="mt-3 text-center">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-primary">Sign Up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SigninForm;
