import React from 'react';
import * as PropTypes from "prop-types";

const Header = ({title, description}) =>
    <header className="App-header">
      <h1>{title}</h1>
      <h2>{description}</h2>
    </header>;
export default Header;

Header.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};