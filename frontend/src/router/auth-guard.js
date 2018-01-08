import {store} from '../Store/store'

export default (to, from, next) => {
  if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
}
