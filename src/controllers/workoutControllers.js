const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) =>{
    const {
        body,
        params : {workoutId},
    } = req;

    if (!workoutId){
        res
            .status(100)
            .send({
                status:400,
                data : {error:"Parameter `:workoutId` can not be empty"},
            });
    }
    try{
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    }catch(error){
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    }

    const allWorkouts = workoutService.getAllWorkouts();
    res.send({ status : "OK", data: allWorkouts});
}

const getOneWorkout = (req, res) =>{
    const {
        params: {workoutId},
    } = req;
    if(!workoutId){
        return;
    }
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({status : "OK", data: workout});
};

const createNewWorkout = (req, res) =>{
    const {body} = req;

    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips 
    ){
        res.status(400)
        .send({
            status:"FAILED",
            data: {
                error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
            },
        });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainersTips: body.trainersTips,
    }
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({status: "OK", data: createdWorkout});
}

const updateOneWorkout = (req, res) => {
    const updatedWorkout = workoutService.updateOneWorkout();
    res.send("Update an existing workout");
}

const deleteOneWorkout = (req, res) =>{
    workoutService.deleteOneWorkout();
    res.send("Delete an existing workout");
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}