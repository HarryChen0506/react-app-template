// host域名管理

const MOCK_API = '/mockapi'
const PROD_API = '/api'

const calcApiPrefix = (isMock) => {
  if (isMock || __MOCK__) {
    return MOCK_API
  }
  return PROD_API
}

// 获取域名
function getHost() {
  return ''
}

export const path = {
  user: {
    login: `${getHost()}${calcApiPrefix()}/login`,
    logout: `${getHost()}${calcApiPrefix()}/logout`,
    currentUser: `${getHost()}${calcApiPrefix()}/user/info`,
  },
  core: {
    demo: `${getHost()}${calcApiPrefix()}/demo/:id`,
  },
  common: {
  }
}

export const api = {
  name: 'api-config',
  apiPrefix: calcApiPrefix(),
  path
}

export default api
