const axios = require("axios");
const express = require("express");
const next = require("next");
const port = 3000;
const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const urlAPI = process.env.urlAPI ;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json({ limit: "500mb" }));

    server.get("*", (req, res) => {
      return handle(req, res);
    });


    //Send info User
    server.post("/user/generateLink", (req, res) => {
      const data = req.body;
      // Aquí llamada al otro api
      axios
        .post(`${urlAPI}/user/generateLink`, data)
        .then((response) => {
          res.status(200).json({ response: response.data });
        })
        .catch((e) =>
          res.status(e.response.status).json({ error: e.response.data })
        );
    });

    server.post("/user/subscribe", (req, res) => {
      const data = req.body;
      axios
        .post(`${urlAPI}/user/subscribe`, data)
        .then((response) => {
          res.status(200).json({ response: response.data });
        })
        .catch((e) =>
          res.status(e.response.status).json({ error: e.response.data })
        );
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Server ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
