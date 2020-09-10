const tokenName = 'authSess'
const userIdName = 'appUserId'
const userRoleName = 'appUserserRole'
const tokenHeadName = 'Bearer'

const getTokenBody = token => token.replace(`${tokenHeadName} `, '')
const getAuthToken = () => localStorage.getItem(tokenName)
const getUserId = () => localStorage.getItem(userIdName)
const getUserRole = () => localStorage.getItem(userRoleName)

const setAuthToken = token => localStorage.setItem(tokenName, getTokenBody(token))
const setUserId = id => localStorage.setItem(userIdName, id)
const setUserRole = role => localStorage.setItem(userRoleName, role)

const userIsAuth = () => Boolean(getAuthToken())
const logout = () => {
  localStorage.removeItem(tokenName)
  localStorage.removeItem(userIdName)
}

export default {
  tokenName,
  userIdName,
  tokenHeadName,
  getTokenBody,
  getAuthToken,
  getUserId,
  getUserRole,

  setAuthToken,
  setUserId,
  setUserRole,

  userIsAuth,
  logout,
}
