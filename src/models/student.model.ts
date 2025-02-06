import mongoose, { Schema } from 'mongoose';


// Defining the interface for the education details
interface educationDetailsSchema {
    collegeName:string,
    degree: string;
    startYear:number,
    endYear:number,
    isPursuing:boolean
   
  }
  

  // Education details schema 
  const educationDetailsSchema = new Schema({
    collegeName: {
      type: String,
      required: [true, 'Please provide the college name'],
      default: null,
    },
    degree: {
      type: String,
      required: [true, 'Please provide the degree'],
      default: null,
    },
    startYear: {
        type: Number,
        required: [true, 'Please provide the start year'],
        default: null,
      },
    endYear: {
        type: Number,
        required: [true, 'Please provide the end year'],
        default: null,
      },
    isPursuing:{
        type:Boolean,
        required: true,
        default:false,
    },
  });


  // Defining the interface for past experience
  interface pastExperienceSchema {
    companyName:string,
    startYear:number,
    endYear:number,
    role: string;
    isWorking:boolean,
  }
  


// Past experience schema definition
  const pastExperienceSchema = new Schema({
    companyName: {
      type: String,
      required: [true, 'Please provide the company name'], 
      default: null,
    },
    role: {
      type: String,
      required: [true, 'Please provide the role'],
      default: null,
    },
    startYear: {
        type: Number,
        required: [true, 'Please provide the start year'],
        default: null,
      },
    endYear: {
        type: String,
        required: [true, 'Please provide the end year'],
        default: null,
      },
    isWorking:{
        type:Boolean,
        required: true,
        default:false
    }
  });

  // Student schema definition
const StudentSchema: Schema = new Schema(
  {
    studentCode: {
      type: String,
      required: [true, 'Please provide your student code'],
      unique:true,
    },
    subRole: {
        type: String,
        default: 'student',
        enum: [ 'student', 'alumni', 'senior alumni', 'contributor'],
        
      },
    enrolledCourses: { 
        type: [mongoose.Schema.Types.ObjectId],
        default: [], 
        ref: 'Course', // refers to  Course model
    },
    currentCourse:{ 
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Course', // refers to Course model
    },
    bookedSessions: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Session', //refers to session model
        default: [] 
    },
    skills: { 
        type: [String], 
        default: [] 
    }, 
    educationDetails:[educationDetailsSchema],
    pastExperience:[pastExperienceSchema],

},
  { timestamps: true },
);


interface StudentInterface {
    studentCode: string;
    subRole: string;
    enrolledCourses: mongoose.Types.ObjectId[];
    currentCourse: mongoose.Types.ObjectId[]; 
    bookedSessions: mongoose.Types.ObjectId[]; 
    skills: string[];
    educationDetails:[{}];
    pastExperience:[{}]; 
  }


  const Student = mongoose.model<StudentInterface>('Student', StudentSchema);
  
  export default Student;
  

  