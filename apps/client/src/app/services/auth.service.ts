import axios from "axios";

export function isAuthenticated() {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  const expiredTime = localStorage.getItem('expired_in');
  if (expiredTime && JSON.parse(expiredTime) < Date.now()) {
    axios.post(process.env['NX_API_URL'] + '/users', { refresh_token })
      .then((res) => {
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("expired_in", JSON.stringify(Date.now() + 60 * 60 * 1000));
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return access_token && refresh_token
}

export function authHeader() {
  if (isAuthenticated()) {
    return { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  }
  return { Authorization: ""};
}