import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions/actionsIndex';

import Header from 'components/Header/Header'
import HeaderAuthLinks from "components/Header/HeaderAuthLinks.jsx";
import HeaderUnauthLinks from "components/Header/HeaderUnauthLinks.jsx";
import logo from 'assets/img/logo-white.png'
import Main from 'components/Navigation/Main'


class App extends Component {


  // componentDidMount() {
  //   this.props.onTryAutoLogin()
  // }

  render() {
    const { isAuthenticated, ...rest } = this.props;

    let navLinks = <HeaderUnauthLinks dropdownHoverColor="info"/>
    if(isAuthenticated){
      navLinks = <HeaderAuthLinks dropdownHoverColor="info"/>
    }

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
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch( actions.authCheckState() )
  };
};



export default withRouter( connect( mapStateToProps, mapDispatchToProps)( App ) );
