const Workout = require("../models/Workout");


// Add New Workout
module.exports.addNewWorkout = async (req, res) => {
    try {
        const { name, duration } = req.body;
        
        // Ensure userId is available from the request (from JWT token)
        const userId = req.user.id;

        // Create a new workout
        const newWorkout = new Workout({
        	userId,
            name,
            duration,
            dateAdded: Date.now()
        });

        // Save the workout to the database
        await newWorkout.save();
        return res.status(201).send(newWorkout);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// Get All Workouts
module.exports.getMyWorkouts = async (req, res) => {
    const userId = req.user.id;

    try {
        const workouts = await Workout.find({ userId });

        if (workouts.length === 0) {
            return res.status(404).send({ error: 'No workouts found' });
        } else {
            return res.status(200).send({ workouts });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// Update a workout via ID
module.exports.updateWorkout = (req, res) => {
    const { name, duration } = req.body;  

    let updatedWorkout = {
        name,
        duration
    };

    return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
        .then(workout => {
            if (workout) {
                res.status(200).send({ message: 'Workout updated successfully', updatedWorkout: workout });
            } else {
                res.status(404).send({ error: 'Workout not found' });
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

// Delete a workout via ID
module.exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the workout by its ID and remove it
        const workout = await Workout.findByIdAndDelete(id);

        if (workout) {
            res.status(200).send({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).send({ error: 'Workout not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: error.message });
    }
};



// Change status to Complete via ID
module.exports.completeWorkStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const workout = await Workout.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );

        if (workout) {
            res.status(200).send({ message: 'Workout status updated successfully', updatedWorkout: workout });
        } else {
            res.status(404).send({ error: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};