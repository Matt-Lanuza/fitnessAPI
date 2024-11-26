const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");

const router = express.Router();

// Add New Workout
router.post('/addWorkout', verify, workoutController.addNewWorkout);

// Get All Workouts
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);

// Update a workout via ID
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);

// Delete a workout via ID
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

// Change status to Complete via ID
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkStatus);


module.exports = router;