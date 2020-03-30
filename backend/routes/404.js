const Router = require('express').Router
const app = Router()
  
app.get("*", (req, res)=>{
      res.status(404).json("API located in /api");
});

module.exports = app;
