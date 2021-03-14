import axios from 'axios'
export const userMenu = ({ params = {} }) => {
  return axios('/userMenu', {
    params
  })
}
