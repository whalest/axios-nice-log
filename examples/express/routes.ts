import express from "express";

const router = express.Router();

router.get("/test", (res, req) => {
  let result = { query: res.query, body: res.body };
  console.log(result);
  req.send(result);
});

export default router;
