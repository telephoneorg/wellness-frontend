/* eslint-disable */
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import useGlobal from "globalStore/store/globalStore";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// core components
import Button from "components/CustomButtons/Button.jsx";
import LoginButton from 'components/LoginButton/LoginButton'
import SignupButton from 'components/SignupButton/SignupButton'

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

function HeaderUnauthLinks({ ...props }) {

  const { classes, dropdownHoverColor, loggedIn } = props;
  const [globalState, globalActions] = useGlobal();
  const { userLoggedIn } = globalState;

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};


  const logoutHandler = (e) => {
    e.preventDefault()
    globalActions.logOut()
  }

  let links =
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          href="communities"
          className={classes.navButton}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          Communities
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <LoginButton />
      </ListItem>
      <ListItem className={classes.listItem}>
        <SignupButton />
      </ListItem>
    </List>

  if(userLoggedIn) {
    links =
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          href="my-orca"
          className={classes.navButton}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          My Orca
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navButton}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          Communities
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navButton}
          onClick={e => logoutHandler(e)}
          color="transparent"
        >
          Log Out
        </Button>
      </ListItem>
    </List>
  }

  return (links);
}

HeaderUnauthLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderUnauthLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

export default withStyles(headerLinksStyle)(HeaderUnauthLinks);
