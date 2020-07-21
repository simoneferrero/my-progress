import dotenv from 'dotenv'

dotenv.config()

export default {
  SERVER_URL: `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`,
}
