const { body } = require('express-validator');

exports.createClassroomValidation = [
  body('name').trim().isLength({ min: 3 }).withMessage('Classroom name must be at least 3 characters long'),
  body('school').isMongoId().withMessage('Invalid School ID format')
];
