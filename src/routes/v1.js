const express = require("express");

function v1Router(collections) {
  const router = express.Router();
  for (const collection of collections) {
    console.log("collection routes: ", collection.model.name);
    const route = "/" + collection.model.name.toLowerCase();
    router.use(route, authRouter(collection));
  }
  return router;
}

function authRouter(collection) {
  const router = express.Router();
  function isAllowed(roles) {
    return function isAllowedMiddleware(req, res, next) {
      let roles = ["writer", "editor", "admin"];
      if (req.user && roles.includes(req.user.role)) {
        next();
      } else {
        res.status(401).send("unauthorized");
      }
    };
  }

  async function handleGetAll(req, res) {
    try {
      let allRecords = await collection.read();
      res.status(200).json(allRecords);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGetOne(req, res) {
    const id = req.params.id;
    try {
      if(!id) throw new Error(`${id} not found!`);
      else {
        let theRecord = await collection.get(id);
        res.status(200).json(theRecord);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleCreate(req, res) {
    let obj = req.body;
    try {
      if(!obj) throw new Error(`Cannot create record ${obj}/1`);
      else {
        let newRecord = await collection.create(obj);
        res.status(200).json(newRecord);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleUpdate(req, res) {
    let id = req.params.id;
    let obj = req.body;
    try {
      if(!id) throw new Error(`${id} not found!`);
      else {
        let updatedRecord = await collection.update(id, obj);
        res.status(200).json(updatedRecord);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDelete(req, res) {
    let id = req.params.id;
    try {
      if(!id) throw new Error(`${id} not found!`);
      else {
        let deletedRecord = await collection.delete(id);
        res.status(200).json(deletedRecord);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  router.get("/", handleGetAll);
  router.get("/:id", handleGetOne);
  router.post("/", isAllowed(), handleCreate);
  router.put("/:id", isAllowed(), handleUpdate);
  router.delete("/:id", isAllowed(), handleDelete);

  return router;
}

module.exports = v1Router;
