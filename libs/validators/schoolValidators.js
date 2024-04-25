const { body } = require('express-validator');

exports.createSchoolValidation = [
  body('name').trim().isLength({ min: 5 }).withMessage('School name must be at least 5 characters long'),
  body('address').trim().isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
  body('admin').isMongoId().withMessage('Invalid Admin ID format')
];
