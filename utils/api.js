import axios from 'axios'

class Api {
  url = 'https://opentdb.com/api.php'
  cancelTokenSource = null

  get = (parameters) => this.request('get', parameters)

  request = (method, params) => {
    return new Promise((resolve) => {
      axios({
        method,
        url: this.url,
        params
      })
        .then(({ data }) => {
          if (data.response_code !== 0) {
            resolve({ error: data })
            this.handleError(data)
          } else {
            resolve(data)
          }
        })
        .catch((err) => {
          resolve({ error: err })
          if (err.response) {
            this.handleError(err.response.data)
          } else {
            window.alert('Please make sure you are connected to internet.')
          }
        })
    })
  }

  handleError(err) {
    console.log('ERRRROR: ', err)
    if (typeof err.message === 'string') {
      window.alert(err.message)
    } else if (typeof err.message === 'object') {
      Object.values(err.message).map((err) => {
        window.alert(err[0])
      })
    }
  }
}

const api = new Api()
export { api }
