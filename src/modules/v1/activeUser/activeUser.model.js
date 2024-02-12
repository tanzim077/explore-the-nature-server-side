/*
 * File           : activeUser.model.js
 * Project        : wms-backend
 * Created Date   : We 17 May 2023 01:50:30
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Wed May 17 2023
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */

const mongoose = require('mongoose');

const ActiveUserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    connectedAt: {
        type: Date,
        required: true,
    },
    dbId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    role: {
        type: String,
    },
    disconnectedAt: {
        type: Date,
    },
});

const ActiveUser = mongoose.model('ActiveUser', ActiveUserSchema);
module.exports = ActiveUser;
