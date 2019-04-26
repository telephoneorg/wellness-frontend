export const logIn = (store) => {
  store.setState({ userLoggedIn: true });
};

export const logOut = (store) => {
  store.setState({ userLoggedIn: false });
};
