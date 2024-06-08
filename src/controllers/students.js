import { getAllStudents, getStudentById, createStudent } from '../services/students.js';
import createHttpError from 'http-errors';


export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};


export const getStudentsController = async (
  req,
  res,
	next,
) => {
	try {
	  const students = await getAllStudents();

	  res.json({
	    status: 200,
	    message: 'Successfully found students!',
	    data: students,
	  });
	} catch(err) {
		next(err);
	}
};


export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    // 2. Створюємо та налаштовуємо помилку
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
