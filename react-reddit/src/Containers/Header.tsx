import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

interface HeaderProps {
  username: string;
}

interface HeaderState {
  authenticate: any;
}

const Header = ({ username }: HeaderProps) => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link className={classes.link} to="/">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            React Reddit
          </Typography>
        </Link>
        <Link to="/" className={classes.link}>
          My Account
        </Link>
        {username ? (
          "hello " + username
        ) : (
          <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={() => {
              const clientId = "OrJeH0ot_Zfl6Q";
              const redirectUrl = "http://localhost:3000/redirect";
              window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=RANDOM_STRING&redirect_uri=${redirectUrl}&duration=permanent&scope=identity`;
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state: HeaderState): HeaderProps {
  const { authenticate } = state;
  const { name: username } = authenticate.data || {
    name: null
  };

  return {
    username
  };
}

// export default withStyles(styles)(connect(mapStateToProps)(AsyncApp));
export default connect(mapStateToProps)(Header);
// export default Header;