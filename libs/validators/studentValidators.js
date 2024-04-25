const { body } = require('express-validator');

exports.createStudentValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('age').isInt({ min: 5, max: 100 }).withMessage('Age must be between 5 and 100'),
  body('classroom').isMongoId().withMessage('Invalid Classroom ID format')
];
