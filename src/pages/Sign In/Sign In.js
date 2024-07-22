import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './SignIn.css';
import { CircularProgress } from "@mui/material";

const SigninForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  return (
    <div>
      <div className="d-flex  flex-row">
        <div className="col-md-8 vh-100 bg-success d-flex align-items-center justify-content-center">
          <img src="./social_media.png" className="col-7" alt="social">
          </img>
        </div>
      <div className="col-md-4 p-5 p-md-3 col-12 d-flex flex-column justify-content-center" >

      <div className="w-xs-50">
        <h2 className="signin-title mb-4 text-center title-web">Wardogram</h2>
        <div className="border border-secondary p-3 p-lg-5 rounded">
        <h2 className="text-center">Sign-In</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await dispatch(login(values.email, values.password));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form-text text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="form-text text-danger"
                />
              </div>
              {authError && typeof authError === "string" && (
                <div className="text-danger mb-3">{authError}</div>
              )}
              <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting ? (
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                          Signing in... <CircularProgress size={24} sx={{color:"black"}}/>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-primary">
                  Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default SigninForm;
