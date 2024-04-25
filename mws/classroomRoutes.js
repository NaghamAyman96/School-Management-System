const express = require('express');
const router = express.Router();
const classroomController = require('../managers/classroomController');
const authenticate = require('../libs/middleware/authenticate');
const authorize = require('../libs/middleware/authorize');
const { validationResult } = require('express-validator');
const { createClassroomValidation } = require('../libs/validators/classroomValidators');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     description: Allows admins to create a new classroom entry.
 *     tags: [Classroom]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - schoolId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the classroom
 *               schoolId:
 *                 type: string
 *                 description: The school ID this classroom belongs to
 *     responses:
 *       201:
 *         description: Classroom created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */


router.post('/', authenticate, authorize(['admin']), createClassroomValidation, checkValidation, classroomController.createClassroom);


/**
 * @swagger
 * /classrooms:
 *   get:
 *     summary: Retrieve all classrooms
 *     description: Returns a list of all classrooms, accessible by any authenticated user.
 *     tags: [Classroom]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of classrooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Classroom'
 *       401:
 *         description: Unauthorized access
 */


router.get('/', authenticate, classroomController.getAllClassrooms);


/**
 * @swagger
 * /classrooms/{id}:
 *   get:
 *     summary: Retrieve a single classroom by ID
 *     description: Fetches a classroom by its unique ID. Accessible by any authenticated user.
 *     tags: [Classroom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the classroom
 *     responses:
 *       200:
 *         description: Classroom retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized access
 */

router.get('/:id', authenticate, classroomController.getClassroomById);


/**
 * @swagger
 * /classrooms/{id}:
 *   put:
 *     summary: Update a classroom
 *     description: Allows admins to update an existing classroom. Validations apply.
 *     tags: [Classroom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the classroom to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classroom'
 *     responses:
 *       200:
 *         description: Classroom updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */


router.put('/:id', authenticate, authorize(['admin']), createClassroomValidation, checkValidation, classroomController.updateClassroomById);


/**
 * @swagger
 * /classrooms/{id}:
 *   delete:
 *     summary: Delete a classroom
 *     description: Allows admins to delete a classroom by its ID.
 *     tags: [Classroom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the classroom to be deleted
 *     responses:
 *       200:
 *         description: Classroom deleted successfully
 *       404:
 *         description: Classroom not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not an admin
 */

router.delete('/:id', authenticate, authorize(['admin']), classroomController.deleteClassroomById);

module.exports = router;
