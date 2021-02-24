import express from "express";
import { main } from "./main";
import routes from "./routes";
import chalk from "chalk";
const app = express();

export const PORT = 3000;
export const HOST = `http://localhost:${PORT}/`;

app.get("/", async (req, res) => {
  const {} = req.query;
  const result = main();
  res.send(result);
});

app.use("/api", routes);

app.listen(PORT);
console.log(chalk.green.underline(HOST));
