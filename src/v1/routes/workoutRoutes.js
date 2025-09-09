const express = require("express");
const workoutController = require("../../controllers/workoutControllers");
const recordController = require("../../controllers/recordControllers");
const apicache = require("apicache")

const router = express.Router();

const cache = apicache.middleware;

//**ADD**//

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.get("/:workoutId/records", recordController.getRecordForWorkout);

router.post("/", workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;