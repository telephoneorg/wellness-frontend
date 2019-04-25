import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import * as actions from 'store/actions/actionsIndex';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Mail from "@material-ui/icons/Mail";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

class SignupButton extends Component {

  state = {
    email:"",
    password:"",
    passwordConfirm:""
  };

  componentDidMount = () => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.password) {
            return false;
        }
        return true;
    });
}

  submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onSignup( this.state.email, this.state.password );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { email, password, passwordConfirm } = this.state

    return (
      <React.Fragment>
          <Card plain className={classes.modalLoginCard}>
            <DialogTitle
              id="login-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <CardHeader
                plain
                color="primary"
                className={`${classes.textCenter} ${classes.cardLoginHeader}`}
              >
                <Button
                  simple
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  onClick={() => this.handleClose("loginModal")}
                >
                  {" "}
                  <Close className={classes.modalClose} />
                </Button>
                <h5 className={classes.cardTitleWhite}>Sign Up</h5>
                <div className={classes.socialLine}>
                  <Button justIcon link className={classes.socialLineButton}>
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <Button justIcon link className={classes.socialLineButton}>
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </div>
              </CardHeader>
            </DialogTitle>
            <DialogContent
              id="login-modal-slide-description"
              className={classes.modalBody}
            >
              <ValidatorForm
                onSubmit={this.submitHandler}
                >
                <p className={`${classes.description} ${classes.textCenter}`}>
                  Or Be Classical
                </p>
                <CardBody className={classes.cardLoginBody}>
                  <TextValidator
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    className={classes.authFields}
                    placeholder="Email"
                    fullWidth
                    onChange={this.handleChange}
                    name="email"
                    id="signup-modal-email"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Mail className={classes.icon} /></InputAdornment>,
                    }}
                  />
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={password}
                    className={classes.authFields}
                    placeholder="Password"
                    fullWidth
                    onChange={this.handleChange}
                    name="password"
                    id="signup-modal-password"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Icon className={classes.icon}>lock_outline</Icon></InputAdornment>,
                    }}
                  />
                  <TextValidator
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['Passwords do not match', 'this field is required']}
                    value={passwordConfirm}
                    style={{marginTop:"2em"}}
                    className={classes.authFields}
                    placeholder="Confirm Password"
                    fullWidth
                    onChange={this.handleChange}
                    name="passwordConfirm"
                    id="signup-modal-password"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Icon className={classes.icon}>lock_outline</Icon></InputAdornment>,
                    }}
                  />
                  <Button
                    style={{marginBottom:"1em"}}
                    color="primary"
                    size="lg"
                    type="submit">
                    Get started
                  </Button>
                </CardBody>
              </ValidatorForm>
            </DialogContent>
          </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errors: state.auth.signupError,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        isNewSignup: state.auth.isNewSignup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: ( email, password, username ) => dispatch( actions.signup( email, password ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(javascriptStyles)(SignupButton));
