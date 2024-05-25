const express = require("express");
const allUsers = require("../controller/admin/allUsers");
const deleteUser = require("../controller/admin/deleteUser");
const editUser = require("../controller/admin/editUser");
const newUser = require("../controller/admin/newUser");
const loginAuth = require("../controller/admin/loginAuth");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Admin
 *
 * @apiDescription Authenticate and log in a user.
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiExample Example usage:
 * curl -i -X POST -d "email=admin@gmail.com.vn&password=123456789" https://chatbox-project-final.onrender.com/admin/login
 *
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "adminToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4Yjc1Y2IwYzVlYjQ4ZDMyNzM5NmQiLCJpYXQiOjE3MDI0MDAyMTYsImV4cCI6MTcwMjQ4NjYxNn0.MDzBcCnm0e3GmI7gFWRGuQ_Ilya4yiB2YlvS0xY6Zf0"
        }
 *
 * @apiError Unauthorized Invalid credentials.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized",
 *       "message": "Invalid credentials"
 *     }
 */
router.post("/login", loginAuth);

/**
 * @api {get} /allUsers Get All Users
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup Admin
 * @apiPermission Admin
 *
 * @apiDescription Get a list of all users.
 *
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" https://chatbox-project-final.onrender.com/allUsers
 * @apiHeader  {String} Authorization='bearer '
 * @apiSuccess {Object[]} users List of user objects.
 * @apiSuccess {String} users._id User's unique ID.
 * @apiSuccess {String} users.username User's username.
 * @apiSuccess {String} users.email User's email.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "allUsers": [
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550b2d62ea91435c9b2836",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:17:17.902Z",
            "updatedAt": "2023-11-15T18:17:17.902Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550b4d62ea91435c9b2837",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:17:49.263Z",
            "updatedAt": "2023-11-15T18:17:49.263Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550c1862ea91435c9b2838",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:21:12.019Z",
            "updatedAt": "2023-11-15T18:21:12.019Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550c1962ea91435c9b2839",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:21:13.600Z",
            "updatedAt": "2023-11-15T18:21:13.600Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550c2562ea91435c9b283a",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:21:25.192Z",
            "updatedAt": "2023-11-15T18:21:25.192Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550d2062ea91435c9b283c",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:25:36.116Z",
            "updatedAt": "2023-11-15T18:25:36.116Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550d4c62ea91435c9b283d",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:26:20.643Z",
            "updatedAt": "2023-11-15T18:26:20.643Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550dab62ea91435c9b283e",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:27:55.989Z",
            "updatedAt": "2023-11-15T18:27:55.989Z",
            "__v": 0
        },
        {
            "isAdmin": false,
            "messages": "",
            "_id": "65550dae62ea91435c9b283f",
            "username": "congtrinh",
            "password": "123@",
            "role": "User",
            "createdAt": "2023-11-15T18:27:58.303Z",
            "updatedAt": "2023-11-15T18:27:58.303Z",
            "__v": 0
        },
    ]
}
 *
 * @apiError Unauthorized User not authorized.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Forbidden",
 *       "message": "User not authorized"
 *     }
 */
router.get("/allUsers", checkAuth, allUsers);

/**
 * @api {post} /addUser Add User
 * @apiVersion 1.0.0
 * @apiName AddUser
 * @apiGroup Admin
 * @apiPermission Admin
 *
 * @apiDescription Add a new user.
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * @apiParam {String} email User's email.
 * @apiHeader  {String} Authorization='bearer '
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" -X POST -d "username=newuser&password=newpassword&email=newuser@gmail.com" https://chatbox-project-final.onrender.com/admin/addUser
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Added user."
 *     }
 *
 * @apiError Unauthorized User not authorized.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
        "message": "User Already existing."
        }
 */
router.post("/addUser", checkAuth, newUser);

/**
 * @api {put} /edituser/:_id Edit User
 * @apiVersion 1.0.0
 * @apiName EditUser
 * @apiGroup Admin
 * @apiPermission Admin
 *
 * @apiDescription Edit an existing user.
 *
 * @apiParam {String} _id User's unique ID.
 * @apiParam {String} username New username.
 * @apiParam {String} password New password.
 * @apiParam {String} email New email.
 * @apiHeader  {String} Authorization='bearer '
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" -X PUT -d "username=updateduser&password=updatedpassword&email=updateduser@example.com" https://chatbox-project-final.onrender.com/admin/edituser/656961790644a2eecf1b1af4
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "message": "User edited successfully."
        }   
 *
 * @apiError Unauthorized User not authorized.
 * @apiError NotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "User not authorized"
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Not Found",
 *       "message": "User not found"
 *     }
 */
router.put("/edituser/:_id", checkAuth, editUser);

/**
 * @api {delete} /deleteuser/:_id Delete User
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Admin
 * @apiPermission Admin
 *
 * @apiDescription Delete a user.
 *
 * @apiParam {String} _id User's unique ID.
 * @apiHeader  {String} Authorization='bearer '
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" -X DELETE https://chatbox-project-final.onrender.com/admin/deleteuser/656961790644a2eecf1b1af4
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User deleted successfully."
 *     }
 *
 * @apiError Unauthorized User not authorized.
 * @apiError NotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "User not authorized"
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 */
router.delete("/deleteuser/:_id", checkAuth, deleteUser);

module.exports = router;
