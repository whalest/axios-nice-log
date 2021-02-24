import axios from "axios";
import axiosNiceLog, { setAxiosNiceLog } from "../../src/index";

setAxiosNiceLog({
  prefix: "kek",
});

let url = `http://localhost:3000/api/test?data=123&user=1`;
let get_params = {
  params: {
    local: "true",
    user: 2,
  },
};

// ex 1
const ex1 = axios.create();
ex1.interceptors.request.use(axiosNiceLog);
ex1.get(url, get_params);

// ex 2 - params
const ex2 = axios.create();

ex2.interceptors.request.use((config) =>
  axiosNiceLog(config, {
    prefix: "custom",
  })
);
ex2.get(url, get_params);

// // ex 3 - params
// const ex3 = axios.create();
// ex3.interceptors.request.use(axiosNiceLog());
// ex3.get(url, get_params);

export const main = () => {
  return "ok";
};
