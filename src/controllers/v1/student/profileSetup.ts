import { Request, Response, NextFunction } from 'express';
import Student from '../../../models/student.model';
import ApiError from '../../../utils/ApiError';
import asyncHandler from '../../../utils/AsyncHandler';
import ApiResponse from '../../../utils/ApiResponse';

// Create or Update Student Profile
export const profileSetup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { studentCode, subRole, enrolledCourses, currentCourses, skills, bookedSessions, educationDetails, pastExperience } =
    req.body;

  let student = await Student.findOne({ studentCode });

  if (!student) {
    student = await Student.create(req.body);
    return res.status(201).json(new ApiResponse(201, student, 'Profile created successfully.'));
  }

  // If student exists, update the profile
  student.subRole = subRole || student.subRole;
  student.enrolledCourses = enrolledCourses || student.enrolledCourses;
  student.currentCourse = currentCourses || student.currentCourse;
  student.skills = skills || student.skills;
  student.bookedSessions = bookedSessions || student.bookedSessions;
  student.educationDetails = educationDetails || student.educationDetails;
  student.pastExperience = pastExperience || student.pastExperience;

  await student.save();

  res.status(200).json(new ApiResponse(200, student, 'Profile updated successfully.'));
});

// Get Student Profile by Student Code
export const getStudentProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { studentCode } = req.params;

  const student = await Student.findOne({ studentCode }).populate('enrolledCourses currentCourses bookedSessions');

  if (!student) {
    return next(new ApiError(404, 'Student profile not found.'));
  }

  res.status(200).json(new ApiResponse(200, student, 'Student profile retrieved successfully.'));
});
