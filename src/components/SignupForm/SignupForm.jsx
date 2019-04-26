import React, { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Auth } from 'aws-amplify';

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
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

const SignupForm = (props) => {

  const { classes } = props;
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  let errorNotification = null
  if(error){
    errorNotification = (
      <React.Fragment>
        <SnackbarContent
          message={error}
          color="danger"
          icon="info_outline"
        />
      </React.Fragment>
    )
  }



  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== password) {
            return false;
        }
        return true;
    });
  })

  const updateFormData = event =>{
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }


  const { email, password, passwordConfirm } = formData;

  function submitHandler( event ){
    event.preventDefault();
    Auth.signUp({
      username: email,
      password: password
      })
      .then(data => console.log(data))
      .catch((err) => {
        setError(err.message)
      });
  }

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
            {errorNotification}
            <DialogContent
              id="login-modal-slide-description"
              className={classes.modalBody}
            >
              <ValidatorForm
                onSubmit={submitHandler}
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
                    onChange={e => updateFormData(e)}
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
                    onChange={e => updateFormData(e)}
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
                    onChange={e => updateFormData(e)}
                    name="passwordConfirm"
                    id="signup-modal-password"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Icon className={classes.icon}>lock_outline</Icon></InputAdornment>,
                    }}
                  />
                  <Button
                    fullWidth
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

export default withStyles(javascriptStyles)(SignupForm);
