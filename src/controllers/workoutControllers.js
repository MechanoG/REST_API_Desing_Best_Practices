const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) =>{
    const allWorkouts = workoutService.getAllWorkouts();
    res.send({ status : "OK", data: allWorkouts});
}

const getOneWorkout = (req, res) =>{
    const workout = workoutService.getOneWorkout();
    res.send("Get an existing workout");
}

const createNewWorkout = (req, res) =>{
    const {body} = req;

    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainersTips 
    ){
        return
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainersTips: body.trainersTips,
    }

    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({status: "OK", data:createdWorkout});
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