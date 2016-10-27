// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navResponsive } from '../actions/actions';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import NavSidebar from './NavSidebar';

class Phoenix extends Component {

  constructor () {
    super();
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive (responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const {
      nav: {active: navActive, responsive}, status, session
    } = this.props;
    const enableNav = (navActive && 'ready' === status.state &&
      session.token && ! session.needPasswordReset);
    let nav;
    if (enableNav) {
      nav = <NavSidebar />;
    }
    const priority = (enableNav && 'single' === responsive ? 'left' : 'right');

    return (
      <App centered={false}>
        <Split priority={priority} flex="right"
          onResponsive={this._onResponsive}>
          {nav}
          {this.props.children}
        </Split>
      </App>
    );
  }
}

let select = (state) => ({
  nav: state.nav,
  session: state.session,
  status: state.status
});

export default connect(select)(Phoenix);
