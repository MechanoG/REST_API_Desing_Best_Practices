const Workout = require("../database/Workout")
const {v4: uuid} = require("uuid");

const getAllWorkouts = () =>{
    const allWorkouts = Workout.getAllWorkouts();
    return allWorkouts;
};

const getOneWorkout = (workoutId) => {
    const workout = Workout.getOneWorkout(workoutId);

    return workout;
};

const createNewWorkout = (newWorkout) =>{
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    };
    try{
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    }catch(error){
        throw error;
    }

    
};

const updateOneWorkout = (workoutId, changes) =>{
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updateOneWorkout;
}

const deleteOneWorkout = () =>{
    return;
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}