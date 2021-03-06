import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Auth from './Auth';
import { isAuthenticated, rootPath } from '../actions/auth';
import QuestionMenuItem from './drawer/QuestionMenuItem';
import TeamMenuItem from './drawer/TeamMenuItem';

class LeftDrawer extends Component {
  render() {
    let signedInItems;
    if (isAuthenticated(this.props)) {
      signedInItems = (
        <div>
          <MenuItem
            primaryText={this.props.auth.displayName}
            onTouchTap={() => {
              this.props.handleNavigate('/account');
            }}
          />
          <MenuItem>
            <Auth />
          </MenuItem>
          <Divider />
          <TeamMenuItem closeDrawer={this.props.onRequestChange} />
          <QuestionMenuItem closeDrawer={this.props.onRequestChange} />
        </div>
      );
    }

    return (
      <Drawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.props.onRequestChange}
      >
        <MenuItem
          onTouchTap={() => {
            this.props.handleNavigate(rootPath(isAuthenticated(this.props)));
          }}
        >
          <h2>1on1 Tracker</h2>
        </MenuItem>
        {signedInItems}
        <Divider />
        <MenuItem
          onTouchTap={() => this.props.handleNavigate('/terms')}
          primaryText="Terms and Conditions"
        />
        <MenuItem
          onTouchTap={() => this.props.handleNavigate('/privacy')}
          primaryText="Privacy Policy"
        />
        <Divider />
        <MenuItem
          onTouchTap={() => this.props.handleNavigate('/about')}
          primaryText="About 1on1tracker"
        />
        <MenuItem
          onTouchTap={() => this.props.handleNavigate('/about-me')}
          primaryText="About me"
        />
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

LeftDrawer.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(LeftDrawer);
