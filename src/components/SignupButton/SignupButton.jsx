import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
// core components
import Button from "components/CustomButtons/Button.jsx";
import SignupForm from 'components/SignupForm/SignupForm'

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SignupButton extends Component {

  state = {
    loginModal: false,
  };

  handleClickOpen = modal => {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  handleClose = modal => {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  render() {
    const { classes } = this.props;
    const { loginModal } = this.state

    return (
      <div>
        <Button color="warning" onClick={() => this.handleClickOpen("loginModal")}>
          Sign Up
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalLogin
          }}
          open={loginModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("loginModal")}
          aria-labelledby="login-modal-slide-title"
          aria-describedby="login-modal-slide-description"
          >
          <SignupForm />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(SignupButton);
