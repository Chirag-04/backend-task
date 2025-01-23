import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
  questionName: { type: String, required: true },
  answer : {type : String , required : true},
  upvote : {type : Number ,required :  true},
  downvote : {type : Number ,required :  true},
  commentCount :  {type : Number , required :  true}
});

export default mongoose.model("Demo", demoSchema);