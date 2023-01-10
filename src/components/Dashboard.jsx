import * as React from "react";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink, Outlet } from "react-router-dom";
import profile from "../images/17.jpg";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Dashboard = () => {
  const loginAuth = useSelector((state) => state.login);
  const userData = loginAuth.loginUserData.user;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{
            backgroundColor: "#40189d",
            height: "84px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="appbar_container">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                User Management System
              </Typography>
            </Toolbar>
            <div className="admin_container">
              {userData._type !== "admin" ? (
                ""
              ) : (
                <Button
                  style={{
                    backgroundColor: "#0d6efd",
                    marginRight: "5em",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                  component={NavLink}
                  to="/userlist"
                >
                  User Update
                </Button>
              )}

              <img src={profile} width="20" alt="" />
              <div className="header-info">
                <span>{userData.fullName}</span>
                <p className="fs-12 mb-0">
                  {userData._type !== "admin" ? "User" : "Super Admin"}
                </p>
              </div>
            </div>
          </div>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="drawer_header">
            <h1 style={{ width: "100%", padding: "0.5em", color: "#fff" }}>
              Test.
            </h1>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "#fff" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List className="side_bar">
            {userData.finance === true ? (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  button
                  component={NavLink}
                  to="/finance"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#fff",
                    background: isActive ? "#0d6efd" : "#40189D",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SummarizeIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Finance"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {userData.uiinterface === true ? (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  button
                  component={NavLink}
                  to="/uiinterface"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#fff",
                    background: isActive ? "#0d6efd" : "#40189D",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ViewComfyIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ui Interface"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {userData.reportgenet === true ? (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  button
                  component={NavLink}
                  to="/reportgeneration"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#fff",
                    background: isActive ? "#0d6efd" : "#40189D",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CardMembershipIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Report Generation"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {userData.productlist === true ? (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  button
                  component={NavLink}
                  to="/productlist"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#fff",
                    background: isActive ? "#0d6efd" : "#40189D",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <InventoryIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="product Listing"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Drawer />
        </Main>
      </Box>
    </>
  );
};

export default Dashboard;
