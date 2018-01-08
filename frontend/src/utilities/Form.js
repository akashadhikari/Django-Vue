import Errors from './Errors'
import axios from 'axios'

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor (data) {
    this.originalData = data
    for (let field in data) {
      this[field] = data[field]
    }
    this.errors = new Errors()
  }
  /**
   * Fetch all relevant data for the form.
   */
  data () {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }
  /**
   * Reset the form fields.
   */
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }

    this.errors.clear()
  }
  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post (url, data) {
    return this.submit('post', url, data)
  }
  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put (url, data) {
    return this.submit('put', url, data)
  }
  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch (url) {
    return this.submit('patch', url)
  }
  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete (url) {
    return this.submit('delete', url)
  }
  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit (requestType, url, data) {
    axios({
      method: requestType,
      url: url,
      headers: data.headers,
      data: data.data
    })
  }
  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess (data) {
    this.reset()
  }
  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail (errors) {
    this.errors.record(errors)
  }
}
export default Form
