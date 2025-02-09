import { Router } from 'express';
import { adminUserApproval } from '../controllers/v1/admin/user-approval.js';
import { updateRoleAndSubRole } from '../controllers/v1/admin/update-role-and-subrole.js';

const adminRoute = Router();

/**
 * @openapi
 * /admin/user-approval:
 *  post:
 *    summary: Approve or Reject a user.
 *    description: Approve or Reject a user.
 *    tags: Admin
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userId:
 *              type: string
 *              description: User ID
 *            status:
 *              type: string
 *              description: User Status
 *    responses:
 *      200:
 *        description: User approved or rejected.
 */
adminRoute.post('/user-approval', adminUserApproval);
adminRoute.post('/update-role-and-sub-role', updateRoleAndSubRole);

export default adminRoute;
