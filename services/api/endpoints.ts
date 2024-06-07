import { API_URL } from "@/config/config";

export const API_REGISTER_STUDENT = "auth/student/register";
export const API_REGISTER_TEACHER = "auth/teacher/register";
export const API_LOGIN_STUDENT = "auth/student/login";
export const API_LOGIN_TEACHER = "auth/teacher/login";

export const API_RESET_PASS_REQUEST_OTP = "reset-password/request-otp";
export const API_RESET_PASS_VERIFY_OTP = "reset-password/verify-otp";
export const API_RESET_PASS = "reset-password";

export const API_ON_BOARD_TEACHER = "teacherrequest";
export const API_FIND_TUTOR = "findtutor/create";
export const API_GET_ALL_TUTOR = "teacher/all";
export const API_TUTOR_SEARCH = "teacher";
export const API_GET_TUTOR = "teacher/details";
export const API_GET_TUTOR_PROFILE = "teacher/profile";
export const API_GET_STUDENT_PROFILE = "student/profile";
export const API_VERIFY_OTP = "auth/otp/verify";
export const API_BOOKING_ONETOONE = "booking/teacher/one_to_one";
export const API_BOOKING_GROUP = "booking/teacher/group";
export const API_SOCIAL_VALIDATION = "auth/social/validation";

//teacher dashboard
export const API_TEACHER_WEEKLY_HOUR = "teacher/weeklyhours";
export const API_VALIDATE_TEACHER_SIGNUP = "auth/teacher/verify/token";
export const API_TEACHER_VALIDATE_REQUEST="auth/teacher/request/verify"
export const API_UPDATE_TEACHER_PASSWORD="teacher/update/password"
export const API_UPDATE_TEACHER_INFO="teacher/update/info"
export const API_GET_TEACHER_BOOKING="teacher/dashboard/booking-list"


//student dasboard
export const API_GET_HOME= "home";
export const SOCIAL_LOGIN="auth/redirect"
export const API_GET_REVIEW="teacher/review"
export const API_UPDATE_STUDENT="student/update/info"
export const API_UPDATE_STUDENT_INFO="student/update/info"
export const API_GET_STUDENT_BOOKING="student/dashboard/bookings"
export const API_GET_FAVOURITE_TUTOR = "student/favourite";
export const API_POST_REVIEW = "teacher/review/submit";

// Blogs and resources
export const API_GET_ALL_RESOURCE= "blog/all";
export const API_GET_SINGLE_BLOG= "blog";

// update API_UPDATE_TEACHER_INFO endpoint when backend api completed
export const API_UPDATE_STUDENT_PASSWORD="student/update/password"
//// update API_UPDATE_TEACHER_INFO when backend api completed
export const API_POST_FAVOURITE="favourite"
export const API_FILE_UPLOAD=`${API_URL}/api/v1/attachments/upload-image`

export const API_GET_TIME_SLOTS = "booking/teacher/timeslots"


