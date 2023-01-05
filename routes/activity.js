const express = require("express");
const router = express.Router();
const activityCtrl = require("../controllers/activity");

const apiUserManagerMiddleware = require("../middleware/apiUserManager");

router.param("userId", apiUserManagerMiddleware);

router.get("/users/:userId", activityCtrl.getActivities);
router.get("/:activityId/users/:userId", activityCtrl.getActivity);
router.post("/users/:userId", activityCtrl.createActivity);
router.put("/:activityId/users/:userId", activityCtrl.updateActivity);
router.delete("/:activityId/users/:userId", activityCtrl.deleteActivity);

module.exports = router;
