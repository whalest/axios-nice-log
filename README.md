# axios-nice-log

Axios interceptor logger for requests query parameters for humans 😜

<img  src="https://raw.githubusercontent.com/reslear/whale/main/packages/axios-nice-log/media/thumb.png"  width="584">

- many options customizable
- set global defaults
- styles by [chalk](https://github.com/chalk/chalk)
- lightweight \~2kb

## Setup

```sh
npm i axios-nice-log
```

## Usage

basic

```ts
import axios from "axios";
import axiosNiceLog from "axios-nice-log";

axios.interceptors.request.use(axiosNiceLog);
```

local option

```ts
import axios from "axios";
import { axiosNiceLog, setAxiosNiceLog } from "axios-nice-log";

// global options
setAxiosNiceLog({
  prefix: "my",
});

// local options
axios.interceptors.request.use((config) =>
  axiosNiceLog(config, {
    prefix: "custom",
  })
);
```

## Api

Options

| **Option** | **Type** | **Default**                         | **description**                                                            |
| ---------- | -------- | ----------------------------------- | -------------------------------------------------------------------------- |
| prefix     | string   | "axios"                             | Line prefix                                                                |
| styles     | object   | [styles default](#styles)           | template parts styles                                                      |
| template   | string   | "%prefix %time %method %url%params" | line template parts available <br>(**%prefix %time %method %url %params**) |
| templates  | object   | [templates default](#tempaltes)     | template parts value <br>**%s** - value replaced                           |
| logger     | callback | console.log                         | logger function                                                            |

### [styles default](#styles)

```ts
{
	prefix: "green",
	time: "reset",
	method: "yellow",
	url: "cyan",
	params: "reset",
	separator: "yellow",
	delimiter: "gray",
}
```

### [templates default](#templates)

```ts
{
    prefix: "[%s]",
    time: "%s",
    method: "%s",
    url: "%s",
    params: "%s",
    separator: "?",
    delimiter: "=",
  }
```
