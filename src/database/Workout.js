const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllWorkouts = (filterParams) => {
    try{

        if(filterParams.page){
            
            const workouts = [];
            const limit = 5;
            const start = (filterParams.page -1) * limit;
            
            for (let i = start; i < (start+limit); i++ ){
                if(DB.workouts[i]){
                    workouts.push(DB.workouts[i]);
                }else{
                    return workouts;    
                }
            }
            return workouts;
        }

        if(filterParams.sort && filterParams.length){
            let workouts = DB.workouts;
            let awnser = [];
            workouts.sort(function(a,b){
                if(new Date(a.updatedAt.split(',')[0]) > new Date(b.updatedAt.split(',')[0])){
                    return -1;
                } else if (new Date(a.updatedAt.split(',')[0]) == new Date(b.updatedAt.split(',')[0])){
                    return 0;
                }else{
                    return 1;
                }
            })
            
            for(let i=0; i <5; i++){
                awnser.push(workouts[i]);
            }
            return awnser;
        } 

        if(filterParams.sort){

            let workouts = DB.workouts;

            if(filterParams.sort == `-createdAt`){

                workouts.sort(function(a,b){
                if(new Date(a.createdAt.split(',')[0]) > new Date(b.createdAt.split(',')[0])){
                    return -1;
                } else if (new Date(a.createdAt.split(',')[0]) == new Date(b.createdAt.split(',')[0])){
                    return 0;
                }else{
                    return 1;
                }
                })
                
            }else if(filterParams.sort == `createdAt`){

                workouts.sort(function(a,b){
                if(new Date(a.createdAt.split(',')[0]) < new Date(b.createdAt.split(',')[0])){
                    return -1;
                } else if (new Date(a.createdAt.split(',')[0]) == new Date(b.createdAt.split(',')[0])){
                    return 0;
                }else{
                    return 1;
                }
                })

            }
            //console.log( new Date(DB.workouts[0].updatedAt.split(',')[0]) > new Date(DB.workouts[1].updatedAt.split(',')[0]) );
            return workouts;

        }
        

        if (filterParams.mode){
            return DB.workouts.filter((workout) => 
                workout.mode.toLowerCase().includes(filterParams.mode)
            );
        }
      
        if (filterParams.equipment){
            return DB.workouts.filter((workout) => 
                workout.equipment.find( equipment => equipment === filterParams.equipment));
        }

        if (filterParams.length){
            let awnser = [];
            for (i=0; i < filterParams.length; i++){
                awnser.push(DB.workouts[i]);
            }
            return awnser;
        }

        ///Jala todos los workouts
        let workouts = DB.workouts;

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