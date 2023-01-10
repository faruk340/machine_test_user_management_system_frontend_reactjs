import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [rememberChecked, setRemenmberChecked] = useState(false);
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const marginTop = { marginTop: 5 };

  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    gender: "",
    phoneNo: "",
    password: "",
    confirmPass: "",
  });

  // ========================validation======
  const notify = () => {
    toast.error("Please fill all the field !", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const errorLogNotify = (valid) => {
    toast.error("Email already present", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const passwordValidate = (valid) => {
    toast.error("Is not a strong password", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const ConfirmpasswordValidate = (valid) => {
    toast.error("Confirm password is not match", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const accountSuccessNotify = () => {
    toast.success("Account create successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const rememberHandel = (e) => {
    const value = e.target.checked;
    setRemenmberChecked(value);
  };
  const handelChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setRegData({
      ...regData,
      [name]: value,
    });
  };
  const submitFun = async () => {
    if (regData.password !== regData.confirmPass) {
      ConfirmpasswordValidate();
    } else if (
      regData.fullName !== "" &&
      regData.email !== "" &&
      regData.phoneNo !== "" &&
      regData.password !== "" &&
      regData.confirmPass !== ""
    ) {
      await axios({
        method: "POST",
        url: "http://localhost:8000/registrationUserData",
        data: {
          fullName: regData.fullName,
          email: regData.email,
          gender: regData.gender,
          phoneNo: regData.phoneNo,
          password: regData.password,
          confirmPass: regData.confirmPass,
          registrationDate: "09-01-2023",
          finance: false,
          uiinterface: false,
          reportgenet: false,
          productlist: false,
          _type: "user",
          status: "Deactive",
        },
      })
        .then((res) => {
          console.log(res.data);
          setRegData({
            fullName: "",
            email: "",
            gender: "",
            phoneNo: "",
            password: "",
            confirmPass: "",
          });
          accountSuccessNotify();
        })
        .catch((err) => {
          const erroe = err.response;
          try {
            if (!erroe.data.message) {
              errorLogNotify();
            }
            if (erroe.data.errors) {
              passwordValidate();
            }
          } catch (error) {
            console.log("");
          }
          console.log("erroe", erroe);
        });
    } else {
      notify();
    }
  };
  return (
    <Grid>
      <ToastContainer theme="colored" />
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            // error={true}
            // helperText="Please Fill Name Field"
            fullWidth
            label="Name"
            placeholder="Enter your name"
            onChange={handelChange}
            value={regData.fullName}
            name="fullName"
          />
          <TextField
            // error={true}
            // helperText="Please Fill Email Field"
            fullWidth
            label="Email"
            placeholder="Enter your email"
            onChange={handelChange}
            value={regData.email}
            name="email"
          />
          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              style={{ display: "initial" }}
              onChange={handelChange}
              value={regData.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            onChange={handelChange}
            value={regData.phoneNo}
            name="phoneNo"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={handelChange}
            value={regData.password}
            name="password"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            onChange={handelChange}
            value={regData.confirmPass}
            name="confirmPass"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" onChange={rememberHandel} />}
            label="I accept the terms and conditions."
          />
          <Button
            variant="contained"
            color="primary"
            disabled={rememberChecked ? false : true}
            onClick={submitFun}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
