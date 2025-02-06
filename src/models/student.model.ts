import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Student  document
export interface IStudent extends Document {
  studentCode: string;  // student code of user
  subRole: string;  // Sub-role ( e.g., 'alumni', 'senior alumni', 'student','contributor')
  enrolledCourses: mongoose.Types.ObjectId[];  // Array of courses previously enrolled in
  currentCourse: mongoose.Types.ObjectId[];  // Array of courses currently enrolled in
  bookedSessions: mongoose.Types.ObjectId[];  // Array of session  references (sessions booked by the user)
  skills: string[];  // List of skills the user has
  educationDetails:[{}] //array of object with year,degree and college name
  pastExperience:[{}]  //array of object with company name , role, year
}


// Define the schema for the Student model
const StudentSchema: Schema = new Schema(
  {
    studentCode: {  type: String, required: true , unique:true,},
    subRole: {type: String,required: true,},           //Sub-role ( e.g., 'alumni', 'senior alumni', 'student','contributor')
    enrolledCourses: { type: [mongoose.Schema.Types.ObjectId],default: [] },
    currentCourse:{ type: [mongoose.Schema.Types.ObjectId],default: [] },
    bookedSessions: { type: [mongoose.Schema.Types.ObjectId], ref: 'Session', default: [] },  // Array of booked sessions
   skills: { type: [String], default: [] },  // List of skills the user has

  
   
  
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Creating the Student model with proper type
const Student = mongoose.model<IStudent>('User', StudentSchema);

export default Student;