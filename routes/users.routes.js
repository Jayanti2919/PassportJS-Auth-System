import express from "express";

const router = express.Router();

const users = []

router.route('/').get((req, res) => {
    res.json(users)
})

export default router;