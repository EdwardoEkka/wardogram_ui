import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const SigninForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  return (
    <motion.div
      className="signin-container d-flex justify-content-center align-items-center vh-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="signin-form-container col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 mt-5 bg-white rounded p-4 shadow"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h2 className="signin-title mb-4 text-center">Sign In</h2>
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
                <ErrorMessage name="email" component="div" className="form-text text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="form-text text-danger" />
              </div>
              {authError && typeof authError === 'string' && <div className="text-danger mb-3">{authError}</div>}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block mb-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
              <div className="text-center">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-primary">Sign Up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default SigninForm;
