import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

const Routing = ({ userIsAuth, redirectUrl, routes }) => {
  return (
    <div>
      <Switch>
        {routes.map(route =>
          route.private ? (
            <PrivateRoute
              userIsAuth={userIsAuth}
              redirectUrl={redirectUrl}
              key={route.path}
              {...route}
            />
          ) : (
            <Route {...route} key={route.path} />
          )
        )}
        <Route component={() => <div>Page 404</div>} />
      </Switch>
    </div>
  )
}
Routing.propTypes = {
  redirectUrl: PropTypes.string,
  userIsAuth: PropTypes.bool,
  routes: PropTypes.array,
}
Routing.defaultProps = {
  redirectUrl: '/login',
  userIsAuth: false,
  routes: [],
}

export default Routing
