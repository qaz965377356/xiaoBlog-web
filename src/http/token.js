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


export function setUserInfo(userinfo) {
  let userinfojson = JSON.stringify(userinfo);
  localStorage.setItem('userinfo', userinfojson)
}

export function getUserInfo() {
  let userinfo = localStorage.getItem('userinfo');
  userinfo =  JSON.parse(userinfo)
  return userinfo
  // return localStorage.token
}

export function removeUserInfo() {
  return localStorage.removeItem('userinfo')
}
