import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll }