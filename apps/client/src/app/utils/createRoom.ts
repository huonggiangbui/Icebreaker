import axios from "axios";

export default function createRoom(navigate: any) {
  axios.post(process.env['NX_API_URL'] + '/sessions')
  .then((res) => {
    navigate(`room/${res.data.code}/signup`)
  })
  .catch((err) => {
    console.log(err)
    })
}