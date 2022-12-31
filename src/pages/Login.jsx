import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useAuthCalls from "../hooks/useAuthCalls";
import { useEffect } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const loginSchema = yup.object().shape({
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

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const { login } = useAuthCalls();

  useEffect(() => {
    if (currentUser) {
      navigate("/stock");
      toastSuccessNotify("Logged In");
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
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
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
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
