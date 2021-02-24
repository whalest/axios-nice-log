import axios from 'axios'
import { useAxiosNiceLog } from '../../src/index'

const start = async () => {
  let url = `http://localhost:3000/api/test?data=123&user=1`
  let get_params = {
    params: {
      local: 'true',
      user: 2,
    },
  }

  const ex1 = axios.create()
  useAxiosNiceLog(ex1)

  // ex 1
  try {
    await ex1.get(url, get_params)
  } catch (e) {}

  // ex 2
  try {
    await ex1.post(url, { option: 'value', pth: 'ddd', d: { c: '' } })
  } catch (e) {}
}

start()

/* 
setAxiosNiceLog({
  prefix: 'kek',
})


// ex 2 - params
const ex2 = axios.create()

ex2.interceptors.request.use((config) =>
  axiosNiceLog(config, {
    prefix: 'custom',
  })
)
ex2.get(url, get_params)

// // ex 3 - params
// const ex3 = axios.create();
// ex3.interceptors.request.use(axiosNiceLog());
// ex3.get(url, get_params);

export const main = () => {
  return 'ok'
}
 */
