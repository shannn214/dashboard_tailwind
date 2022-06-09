import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 && status <= 500
  },
})

API.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

API.interceptors.response.use(
  function (response) {
    if (response.status !== 200) {
      const errorMessage = response.data.message || response.data.msg
      console.error(
        `url:${response.request.responseURL} error`,
        `errorMessage:${errorMessage}`,
        `status code:${response.status}`
      )
    }
    return response
  },
  function (error) {
    console.error(error)
    error.response && console.error(error.response.request.responseURL, error)
    return Promise.reject(error)
  }
)

export const getEmployees = () => API.get(`/employeesDataMock.json`)
export const getCustomers = () => API.get(`/customersDataMock.json`)
