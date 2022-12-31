import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import useAuthCalls from "../hooks/useAuthCalls";
import { useEffect } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .matches(/[A-Z]+/, "Password Must Have At Least an Uppercase Character"),
  first_name: yup
    .string()
    .required()
    .matches(/[A-Z]+/, "Password Must Have At Least an Uppercase Character"),
  last_name: yup
    .string()
    .required()
    .matches(/[A-Z]+/, "Password Must Have At Least an Uppercase Character"),
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Please Enter Your Email"),
  password: yup
    .string()
    .required("Please Enter a Password")
    .min(8, "Password Must Have Min 8 characters")
    .max(16, "Password Must Have Max 16 characters")
    .matches(/\d+/, "Password Must Have At Least a Number")
    .matches(/[a-z]+/, "Password Must Have At Least a Lowercase Character")
    .matches(/[A-Z]+/, "Password Must Have At Least an Uppercase Character")
    .matches(
      /[!,?{}><%&$#£+-.]+/,
      "Password must have at least a special character"
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.auth);
  const { register } = useAuthCalls();

  useEffect(() => {
    if (currentUser) {
      navigate("/stock");
      toastSuccessNotify("Successfully Registered");
    }
  }, [currentUser]);

  useEffect(() => {
    error && toastErrorNotify("Something went wrong");
  }, [error]);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="User Name"
                    name="username"
                    id="userName"
                    type="userName"
                    variant="outlined"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                  <TextField
                    label="First Name"
                    name="first_name"
                    id="firstName"
                    type="firstName"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    id="lastName"
                    type="lastName"
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
