const express = require('express');
const { createAOrder, getOrdersByEmail, getAllOrders, updateOrderStatus } = require('./order.controller');

const router = express.Router();

//create order endpoint
router.post("/", createAOrder);

//get orders by email
router.get("/email/:email", getOrdersByEmail);

//get all orders (admin)
router.get("/", getAllOrders);

//update order status (admin)
router.patch("/:id/status", updateOrderStatus);

module.exports = router;