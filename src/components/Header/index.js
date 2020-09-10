import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import styled, { withTheme } from 'styled-components'

import { Switch } from '../index'

import { auth, server, styleHelpers } from '../../helpers'

const { logout, userIsAuth } = auth
const { setServerUrl, getServerType } = server
const { getIntValue } = styleHelpers

const headerNavList = [
  {
    key: 'main',
    to: '/',
    title: 'Main',
  },
  {
    key: 'get-word',
    to: '/get-word',
    title: 'Get word',
  },
  {
    key: 'add-word',
    to: '/add-word',
    title: 'Add word',
  },
]

const Wrap = styled.header`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  left: 0;
  top: 0;
  height: ${props => props.theme.header.height};
  width: 100%;
  z-index: 1;
`

const HeaderNavList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
`

const HeaderNavItem = styled.li`
  margin-right: 20px;
`

class Header extends Component {
  handleLogout = e => {
    const { history } = this.props
    e.preventDefault()
    logout()
    setTimeout(() => history.push({ location: 'login' }), 500)
  }

  handleSwitcherClick = (number, item) => {
    const {
      theme: {
        trans: { defaultDuration },
      },
    } = this.props
    setServerUrl(item.value)
    setInterval(() => window.location.reload(true), getIntValue(defaultDuration))
  }

  render() {
    const { children } = this.props
    return (
      <Wrap>
        {userIsAuth() && (
          <HeaderNavList>
            {headerNavList.map(item => (
              <HeaderNavItem key={item.key}>
                <Link to={item.to}>{item.title}</Link>
              </HeaderNavItem>
            ))}
            <HeaderNavItem>
              <button onClick={this.handleLogout} type="button">
                Logout
              </button>
            </HeaderNavItem>
            {/* <Link onClick={this.handleLogout} to="/login">
              login
            </Link>
            <button onClick={this.handleLogout} type="button">
              Logout
            </button> */}
          </HeaderNavList>
        )}
        <Switch
          defaultActive={getServerType() === 'local' ? 0 : 1}
          onClick={this.handleSwitcherClick}
          data={[
            {
              title: 'Local',
              value: 'local',
            },
            {
              title: 'Remote',
              value: 'remote',
            },
          ]}
        />
        {children}
      </Wrap>
    )
  }
}
Header.propTypes = {
  theme: PropTypes.object.isRequired,
  history: PropTypes.object,
  children: PropTypes.any,
}
Header.defaultProps = {
  history: {},
  children: null,
}
export default withRouter(withTheme(Header))
