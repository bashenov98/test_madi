const { Router } = require("express");
const { create_task, get_task_by_id, update_task_by_id, delete_task_by_id } = require("./controllers/task");
const { register, login } = require("./controllers/auth");
const { create_tag, get_tag_by_id, update_tag_by_id, delete_tag_by_id } = require("./controllers/tag");

const router = Router();

// middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

// auth
router.post("/users", register);
router.post("/users/authenticate", login);

// tasks
router.post("/tasks", verifyToken, create_task);
router.get("/tasks/:id", verifyToken,  get_task_by_id);
router.put("/tasks/:id", verifyToken,  update_task_by_id);
router.delete("/tasks/:id", verifyToken,  delete_task_by_id)

// tags
router.post("/tasks/:taskId/tags", verifyToken, create_tag);
router.get("/tags/:id", verifyToken, get_tag_by_id);
router.put("/tags/:id", verifyToken, update_tag_by_id);
router.delete("/tags/:id", verifyToken, delete_tag_by_id)



module.exports = router;