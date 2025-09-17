const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllWorkouts = (filterParams) => {
    try{
        let workouts = DB.workouts;
        if (filterParams.mode){
            console.log(filterParams.mode)
            return DB.workouts.filter((workout) => 
                workout.mode.toLowerCase().includes(filterParams.mode)
            );
        }
        if (filterParams.equipment){
            console.log(filterParams.equipment)
            return DB.workouts.filter((workout) => 
                workout.equipment.toLowerCase().includes(filterParams.equipment));
        } 
        return workouts;
    }catch(error){
        throw {status: 500, message: error};
    }
}

const getOneWorkout = (workoutId) => {
    try{
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if(!workout){
            throw{
                status: 400,
                message: `Cant find workout whit the id '${workoutId}'`,
            };
        }
        return workout;
    }catch(error){
        throw {
            status: error?.status || 500, message: error?.message || error};
    }
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
    try{
        const isAlreadyAdded = 
            DB.workouts.findIndex((workout)=> workout.name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw{
                status: 400,
                massage: `Workout with the name ${newWorkout} already exist.`
            };
        }
        const indexForUpdate = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        );
        if(indexForUpdate === -1){
            throw{
                status: 400,
                message: `Cant find a workout with the id '${workoutId}' `,
            }
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        };
        DB.workouts[indexForUpdate] = updateOneWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    }catch(error){
        throw{
            status: error?.status || 500,
            mesagge: error?.message || error,
        };
    }
};

const deleteOneWorkout = (workoutId) =>{
    try{
        const indexForDeletion = DB.workouts.findIndex(
            (workout)=> workout.id === workoutId
        );
        if (indexForDeletion === -1){
            throw {
                status: 400,
                mesagge: `Cant find a workout with the id '${workoutId}'`,
            }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    }catch(error){
        throw{
            status : error?.status || 500,
            mesaage : error?.message || error,
        }
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};