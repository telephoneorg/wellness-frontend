import React,{ useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

import useGlobal from "globalStore/store/globalStore";

import Header from 'components/Header/Header'
import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import HeaderUnauthLinks from "components/Header/HeaderUnauthLinks.jsx";
import logo from 'assets/img/logo-white.png'
import Main from 'components/Navigation/Main'

Amplify.configure(awsmobile);

function App(props) {
  const { ...rest } = props;
  const [globalState, globalActions] = useGlobal();
  const { userLoggedIn } = globalState;

  return (
    <React.Fragment>
      <Header
        loggedIn = {globalState.loggedIn}
        color="transparent"
        brand={<img src={logo} alt="logo" height="40px"/>}
        links={<HeaderLinks  />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "primary"
        }}
        {...rest}
      />
    <Main/>
    </React.Fragment>
  );
}



export default withRouter( App );
