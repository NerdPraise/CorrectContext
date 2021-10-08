import Axios from "axios"

const baseURL = "https://postman-echo.com/"

const AuthenticatedAPI = Axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 18000,
})

export const API = AuthenticatedAPI

export enum StatusCode {
  INITIAL = 0,
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  NOT_FOUND = 404,
}

export const validateName = (value: any) => {
  let error
  if (!value) {
    error = "Required"
  }
  return error
}

export const validateEmail = (value: any) => {
  let error
  if (!value) {
    error = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address"
  }
  return error
}
