const express = require('express');
const router = express.Router();
const studentController = require('../managers/studentController');
const authenticate = require('../libs/middleware/authenticate');
const authorize = require('../libs/middleware/authorize');
const { validationResult } = require('express-validator');
const { createStudentValidation } = require('../libs/validators/studentValidators');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Allows admins to add a new student to the system.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */

router.post('/', authenticate, authorize(['admin']), createStudentValidation, checkValidation, studentController.createStudent);


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     description: Returns a list of all students, accessible by any authenticated user.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized access
 */

router.get('/', authenticate, studentController.getAllStudents);


/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a single student by ID
 *     description: Fetches a student by their unique ID. Accessible by any authenticated user.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized access
 */

router.get('/:id', authenticate, studentController.getStudentById);


/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     description: Allows admins to update an existing student's information.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */

router.put('/:id', authenticate, authorize(['admin']), createStudentValidation, checkValidation, studentController.updateStudentById);


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     description: Allows admins to remove a student from the system.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student to be deleted
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */

router.delete('/:id', authenticate, authorize(['admin']), studentController.deleteStudentById);

module.exports = router;
