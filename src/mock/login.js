import { Random } from 'mockjs'

const login = {
  status: 200,
  count: '',
  token: Random.string(30)
}

export default {
  'post|/api/login': login
}
