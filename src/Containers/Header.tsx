import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            React Reddit
          </Typography>
        </Link>
        <Link
          // variant="button"
          // color="textPrimary"
          to="/"
          className={classes.link}
        >
          My Account
        </Link>
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
