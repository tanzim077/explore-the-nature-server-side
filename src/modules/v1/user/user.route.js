/*
 * File           : user.route.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:29
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Thu Jan 11 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */

const express = require('express');
const router = express.Router();

router.post('/create-user/', 'createUser')
router.get('/get-all-users/', 'createUser')
router.get('/get-user/:id', 'createUser')
router.patch('/update-user/:id', 'createUser')
router.patch('/change-user-role/:id', 'createUser')
router.patch("/deactivate-user/:id", "createUser");
router.delete('/delete-user/:id', 'createUser')

module.exports = router;