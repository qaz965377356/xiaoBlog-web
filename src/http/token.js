export function getToken() {
  return localStorage.getItem('token')
  // return localStorage.token
}

export function setToken(token) {
  // Bearer
  localStorage.setItem('token', token)
  // return localStorage.token = token
}

export function removeToken() {
  return localStorage.removeItem('token')
}
