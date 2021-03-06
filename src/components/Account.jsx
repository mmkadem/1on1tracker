import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * @description PropTypes for Account component
 * @type {{displayName: (*), email: (*), photoURL: (*)}}
 */
const propTypes = {
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
};

class Account extends Component {
  render() {
    return (
      <div className="container about account">
        <h1>{this.props.displayName}</h1>
        <h2>{this.props.email}</h2>
        <p>
          <img src={this.props.photoURL} alt="avatar"/>
        </p>
      </div>
    );
  }
}

Account.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
    email: state.auth.email,
    photoURL: state.auth.photoURL,
  };
};

export default connect(mapStateToProps)(Account);
