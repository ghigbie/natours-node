const express = require('express');

const getAllUsers = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const getUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const deleteUser = (req, res, next) => {
    res.status.json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}