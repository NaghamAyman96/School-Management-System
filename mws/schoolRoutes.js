const express = require('express');
const router = express.Router();
const schoolController = require('../managers/schoolController');
const authenticate = require('../libs/middleware/authenticate');
const authorize = require('../libs/middleware/authorize');
const { validationResult } = require('express-validator');
const { createSchoolValidation } = require('../libs/validators/schoolValidators');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


/**
 * @swagger
 * /schools:
 *   post:
 *     summary: Create a new school
 *     description: This endpoint allows superadmins to create a new school entry.
 *     tags: [School]
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
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the school
 *               address:
 *                 type: string
 *                 description: Address of the school
 *     responses:
 *       201:
 *         description: School created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not superadmin
 */

router.post('/', authenticate, authorize(['superadmin']), createSchoolValidation, checkValidation, schoolController.createSchool);


/**
 * @swagger
 * /schools:
 *   get:
 *     summary: Retrieve all schools
 *     description: Returns a list of all schools accessible by any authenticated user.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       401:
 *         description: Unauthorized access
 */

router.get('/', authenticate, schoolController.getAllSchools);


/**
 * @swagger
 * /schools/{id}:
 *   get:
 *     summary: Retrieve a single school by ID
 *     description: Fetches a school by its unique ID. Accessible by any authenticated user.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the school
 *     responses:
 *       200:
 *         description: School retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized access
 */

router.get('/:id', authenticate, schoolController.getSchoolById);



/**
 * @swagger
 * /schools/{id}:
 *   put:
 *     summary: Update a school
 *     description: Allows superadmins to update an existing school. Validations apply.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       200:
 *         description: School updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not superadmin
 *       404:
 *         description: School not found
 */

router.put('/:id', authenticate, authorize(['superadmin']), createSchoolValidation, checkValidation, schoolController.updateSchoolById);


/**
 * @swagger
 * /schools/{id}:
 *   delete:
 *     summary: Delete a school
 *     description: Allows superadmins to delete a school by its ID.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the school to be deleted
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden, not superadmin
 */

router.delete('/:id', authenticate, authorize(['superadmin']), schoolController.deleteSchoolById);

module.exports = router;
