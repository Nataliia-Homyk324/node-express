import { Router } from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema, updateStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/',checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId',checkRoles(ROLES.TEACHER, ROLES.PARENT),isValidId, ctrlWrapper(getStudentByIdController));

router.post('/students',checkRoles(ROLES.TEACHER), validateBody(createStudentSchema), ctrlWrapper(createStudentController));

router.delete('/students/:studentId',checkRoles(ROLES.TEACHER),isValidId, ctrlWrapper(deleteStudentController));

router.put('/students/:studentId', checkRoles(ROLES.TEACHER), isValidId,  ctrlWrapper(upsertStudentController));

router.patch('/students/:studentId', checkRoles(ROLES.TEACHER, ROLES.PARENT),isValidId, validateBody(updateStudentSchema), ctrlWrapper(patchStudentController));

router.use(authenticate);



export default router;


