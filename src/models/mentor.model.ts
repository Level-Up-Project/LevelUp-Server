import mongoose, { Schema } from 'mongoose';


// Defining the interface for the slot details
interface slotDetailsSchema {
    day:string,
    startTime:Time,
    endTimer:time,
    isAvailable:boolean
   
  }
  

  // slot details schema 
  const slotDetailsSchema = new Schema({
    day: {
      type: String,
      required: [true, 'Please provide available day'],
      default: 'monday',
    },
    startTime: {
        type: time,
        required: [true, 'Please provide the start time'],
      },
    endTime: {
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
const MentorSchema: Schema = new Schema(
  {
    subRole: {
        type: String,
        default: [],
        enum: [ 'EC', 'IA', 'Leadership'],
        
      },
    skills: { 
        type: [String], 
        default: [] 
    }, 
    prevCoursesAssigned:{ 
        type: [mongoose.Schema.Types.ObjectId],
        default: [], 
        ref: 'Course', // refers to  Course model
    },
    currentCoursesAssigned:{ 
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Course', // refers to Course model
    },
    bookedSessions: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Session', //refers to session model
        default: [] 
    },

    slots:[slotDetailsSchema],
    passedSession:[passedSessionSchema],

},
  { timestamps: true },
);


interface MentorInterface {
    subRole: string;
    skills: string[];
    prevCoursesAssigned: mongoose.Types.ObjectId[];
    currentCoursesAssigned: mongoose.Types.ObjectId[]; 
    bookedSessions: mongoose.Types.ObjectId[]; 
    slots:[{}];
    passedSession:[{}]
  }


  const Mentor = mongoose.model<MentorInterface>('Mentor', MentorSchema);
  
  export default Mentor;
  

  