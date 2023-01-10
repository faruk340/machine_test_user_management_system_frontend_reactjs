import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { Grid, Card } from "@mui/material";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import swal from "sweetalert";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const Userlist = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    fullName: "",
    email: "",
    gender: "",
    phoneNo: "",
    password: "",
    confirmPass: "",
    registrationDate: "",
    finance: false,
    uiinterface: false,
    reportgenet: false,
    productlist: false,
    _type: "",
    status: "",
  });
  const uniqueId = state._id;
  const handleOpen = (row) => {
    setOpen(true);
    setState(row);
  };
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { finance, uiinterface, reportgenet, productlist } = state;

  const [allData, setAllData] = useState([]);

  const getUserData = async () => {
    await axios
      .get("http://localhost:8000/registrationUserData")
      .then((res) => {
        const userData = res.data;
        setAllData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateData = async () => {
    await axios({
      method: "patch",
      url: `http://localhost:8000/registrationUserData/${uniqueId}`,
      data: {
        finance: state.finance,
        uiinterface: state.uiinterface,
        reportgenet: state.reportgenet,
        productlist: state.productlist,
      },
    })
      .then((res) => {
        const resdata = res.data;
        setState(resdata);
        swal("Good job!", "update successfull", "success");
        setOpen(false);
        getUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.fullName,
    },
    {
      name: "Registration Date",
      selector: (row) => row.registrationDate,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Update",
      cell: (row) => (
        <Button
          style={{ backgroundColor: "#0d6efd" }}
          variant="contained"
          onClick={() => {
            handleOpen(row);
          }}
        >
          <BorderColorIcon fontSize="20px" />
        </Button>
      ),
    },
  ];
  const customstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customstyle}>
          <Grid item xs={4}>
            <Box>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
                style={{ width: "95%" }}
              >
                <FormGroup
                  className="row col-md-3 col-lg-12"
                  style={{
                    width: "95%",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={finance}
                        onChange={(e) => handleChange(e)}
                        name="finance"
                      />
                    }
                    label="Finance"
                    style={{
                      width: "20%",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={uiinterface}
                        onChange={(e) => handleChange(e)}
                        name="uiinterface"
                      />
                    }
                    label="Ui InterFace"
                    style={{
                      width: "20%",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportgenet}
                        onChange={(e) => handleChange(e)}
                        name="reportgenet"
                      />
                    }
                    label="Report Generator"
                    style={{
                      width: "20%",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={productlist}
                        onChange={(e) => handleChange(e)}
                        name="productlist"
                      />
                    }
                    label="Product List"
                    style={{
                      width: "20%",
                    }}
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Button
              style={{ marginLeft: "1.2em", backgroundColor: "#0d6efd" }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={updateData}
            >
              Update
            </Button>
            <Button
              style={{ marginLeft: "1.2em", backgroundColor: "red" }}
              variant="contained"
              onClick={() => handleClose(false)}
            >
              close
            </Button>
          </Grid>
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "80%",
          marginLeft: "16.5em",
        }}
      >
        <DataTable columns={columns} data={allData} />
      </div>
    </>
  );
};

export default Userlist;
