import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
  questionName: { type: String, required: true },
  answer : {type : String , required : true},
});

export default mongoose.model("Demo", demoSchema);