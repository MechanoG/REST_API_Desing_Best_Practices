const DB = require("./db.json");

const getRecordForWorkout = (workoutId) => { 
  console.log("Data Record")
  console.log(workoutId.workoutId);   
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    console.log(record);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
module.exports = { getRecordForWorkout };