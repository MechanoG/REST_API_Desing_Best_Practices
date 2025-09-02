const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllWorkouts = () => {
    return DB.workouts;
}

const getOneWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if(!workout){
        return;
    }
    return workout;
}

const createNewWorkout = (newWorkout) =>{
    try{
        const isAlreadyAdded = 
            DB.workouts.findIndex((workout)=> workout.name === newWorkout.name) > -1;
        if(isAlreadyAdded){
            throw{
                status: 400,
                massage: `Workout with the name ${newWorkout} already exist.`
            };
        }
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error){
        throw {status:error?.status || 500, message: error?.message || error};
    }
};

const updateOneWorkout = (workoutId, changes) => {
    const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);

    const updatedWorkout = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    };
    DB.workouts[indexForUpdate] = updateOneWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
}

const deleteOneWorkout = (workoutId) =>{
    const indexForDeletion = DB.workouts.findIndex((workout)=>{
        workout.id === workoutId;
    });

    if (indexForDeletion === -1){
        return
    }

    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};