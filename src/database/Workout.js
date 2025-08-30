const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllWorkouts = () => {
    return DB.workouts;
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
        console.log(error.message)
        throw {status:error?.status || 500, message: error?.message || error};
    }
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
};