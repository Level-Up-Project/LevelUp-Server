import { Router } from 'express';
import { adminUserApproval } from '../controllers/v1/admin/user-approval.js';
import { updateRoleAndSubRole } from '../controllers/v1/admin/update-role-and-subrole.js';

const adminRoute = Router();

/**
 * @swagger
 * /admin/user-approval:
 *  post:
 *    summary: Approve or Reject a user
 *    description: Approve or Reject a user
 *    tags:
 *      - Admin
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: User ID
 *              status:
 *                type: string
 *                description: User Status
 *    responses:
 *      200:
 *        description: User approved or rejected
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Status of the request
 *                message:
 *                  type: string
 *                  description: Message of the request
 *                errors:
 *                  type: array
 *                  description: Array of errors
 *                  items:
 *                    type: object
 *                    properties:
 *                      field:
 *                        type: string
 *                        description: Field name
 *                      message:
 *                        type: string
 *                        description: Error message
 *                      value:
 *                        type: string
 *                        description: Value of the field
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Status of the request
 *                message:
 *                  type: string
 *                  description: Message of the request
 *                errors:
 *                  type: array
 *                  description: Array of errors
 *                  items:
 *                    type: object
 *                    properties:
 *                      field:
 *                        type: string
 *                        description: Field name
 *                      message:
 *                        type: string
 *                        description: Error message
 *                      value:
 *                        type: string
 *                        description: Value of the field
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Status of the request
 *                message:
 *                  type: string
 *                  description: Message of the request
 *                errors:
 *                  type: array
 *                  description: Array of errors
 *                  items:
 *                    type: object
 *                    properties:
 *                      field:
 *                        type: string
 *                        description: Field name
 *                      message:
 *                        type: string
 *                        description: Error message
 *                      value:
 *                        type: string
 *                        description: Value of the field
 */
adminRoute.post('/user-approval', adminUserApproval);
adminRoute.post('/update-role-and-sub-role', updateRoleAndSubRole);

export default adminRoute;
