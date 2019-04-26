import React from 'react';
import { withRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

import Header from 'components/Header/Header'
import HeaderAuthLinks from "components/Header/HeaderAuthLinks.jsx";
import HeaderUnauthLinks from "components/Header/HeaderUnauthLinks.jsx";
import logo from 'assets/img/logo-white.png'
import Main from 'components/Navigation/Main'

Amplify.configure(awsmobile);

function App(props) {

  const { ...rest } = props;

  let navLinks = <HeaderUnauthLinks dropdownHoverColor="info"/>

  return (
    <React.Fragment>
      <Header
        color="transparent"
        brand={<img src={logo} alt="logo" height="40px"/>}
        links={navLinks}
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
