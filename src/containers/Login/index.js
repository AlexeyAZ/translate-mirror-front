import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose, withApollo } from 'react-apollo'

import get from 'lodash/get'

import { auth } from '../../helpers'
import { FormField, Input, Button } from '../../components'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

const { setAuthToken, setUserId, setUserRole, getTokenBody } = auth

const buttons = [
  {
    title: 'Create user',
    name: 'createUserForm',
  },
  {
    title: 'Login user',
    name: 'loginUserForm',
  },
]

class Login extends Component {
  state = {
    loginUserForm: {
      email: {
        name: 'email',
        label: 'E-mail',
        value: '',
      },
      password: {
        name: 'password',
        label: 'Password',
        value: '',
      },
    },
    createUserForm: {
      firstName: {
        name: 'firstName',
        label: 'First name',
        value: '',
      },
      email: {
        name: 'email',
        label: 'E-mail',
        value: '',
      },
      password: {
        name: 'password',
        label: 'Password',
        value: '',
      },
    },
    activeForm: 'loginUserForm',
  }

  handleInputChange = (name, value) => {
    const { activeForm } = this.state
    const fields = this.state[activeForm]
    const newField = Object.assign({}, fields[name])
    newField.value = value

    this.setState({ [activeForm]: { ...fields, [name]: newField } })
  }

  handleLoginUserFormSubmit = e => {
    e.preventDefault()
    const { loginUserForm } = this.state
    const { client, history } = this.props
    client
      .query({
        query: queries.users.LOGIN_USER,
        variables: {
          email: loginUserForm.email.value,
          password: loginUserForm.password.value,
        },
        fetchPolicy: 'network-only',
      })
      .then(result => {
        const token = get(result, 'data.loginUser.token', null)
        const id = get(result, 'data.loginUser._id', null)
        const role = get(result, 'data.loginUser.role', null)
        if (token) {
          setAuthToken(token)
          setUserId(id)
          setUserRole(role)
          client
            .mutate({
              mutation: mutations.auth.SET_AUTH_STATUS,
              variables: {
                status: true,
              },
            })
            .then(() => {
              history.replace({ pathname: '/get-word' })
            })
        }
      })
      .catch(err => console.log(err))
  }

  handleCreateUserFormSubmit = e => {
    e.preventDefault()
    const { activeForm } = this.state
    const fields = this.state[activeForm]
    const { createUser, history } = this.props

    createUser({
      variables: {
        firstName: fields.firstName.value,
        email: fields.email.value,
        password: fields.password.value,
      },
    })
      .then(result => {
        const token = get(result, 'data.createUser.token', null)
        const id = get(result, 'data.createUser._id', null)
        if (token) {
          setAuthToken(token)
          setUserId(id)
          history.push({ pathname: '/get-word' })
        }
      })
      .catch(err => console.log(err))
  }

  handleSwitchForm = name => {
    this.setState({ activeForm: name })
  }

  render() {
    const { activeForm } = this.state
    const fields = this.state[activeForm]
    return (
      <div>
        {buttons.map(button => (
          <Button key={button.name} onClick={() => this.handleSwitchForm(button.name)}>
            {button.title}
          </Button>
        ))}
        {activeForm === 'loginUserForm' && (
          <form onSubmit={this.handleLoginUserFormSubmit}>
            <p>Login user</p>
            {Object.keys(fields).map(field => (
              <FormField key={fields[field].name}>
                <Input
                  value={fields[field].value}
                  id={fields[field].name}
                  onChange={value => this.handleInputChange(field, value)}
                  label={fields[field].label}
                />
              </FormField>
            ))}
            <Button>Submit</Button>
          </form>
        )}
        {activeForm === 'createUserForm' && (
          <form onSubmit={this.handleCreateUserFormSubmit}>
            <p>Create user</p>
            {Object.keys(fields).map(field => (
              <FormField key={fields[field].name}>
                <Input
                  value={fields[field].value}
                  id={fields[field].name}
                  onChange={value => this.handleInputChange(field, value)}
                  label={fields[field].label}
                />
              </FormField>
            ))}
            <Button>Submit</Button>
          </form>
        )}
      </div>
    )
  }
}

Login.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
}

export default compose(
  withApollo,
  graphql(mutations.users.CREATE_USER, {
    name: 'createUser',
  })
)(Login)
