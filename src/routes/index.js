import React from 'react'
import { AddWord, GetWord, Login } from '../containers'
// import { Redirect } from '../components'

console.log(Login)

const routes = [
  {
    path: '/',
    title: 'Main',
    component: () => <div>Main</div>, //<Redirect to="/login" />,
    exact: true,
    private: true,
  },
  {
    path: '/login',
    title: 'Login',
    component: Login,
    exact: true,
    private: false,
    key: 'login',
  },
  {
    path: '/get-word',
    title: 'Get word',
    component: GetWord,
    exact: true,
    private: true,
    key: 'get-word',
  },
  {
    path: '/add-word',
    title: 'Add word',
    component: AddWord,
    exact: true,
    private: true,
    key: 'add-word',
  },
]

export default routes
