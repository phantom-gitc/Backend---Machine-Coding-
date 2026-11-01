import mongoose from "mongoose";
import user from "../models/user.models.js";
import getPagination from "../utils/pagination.js";



// Create user controller 

export const createUser = async (req, res, next) => {

    try {

        const { name, email, age, role } = req.body;

        const isUserAlreadyExist = await user.findOne({
            email: email.toLowerCase()
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                sucess: false,
                message: "Email already exist"
            });
        }

        const newUser = await user.create({
            name,
            email: email.toLowerCase(),
            age,
            role
        });

        res.status(201).json({
            sucess: true,
            message: "User created sucessfully ",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};



// Get all users controller 

export const getUsers = async (req, res, next) => {

    try {

        const { search, role, isActive, sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10 } = req.query;

        const query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                }
            ];
        }

        // Filter by role
        if (role) {
            query.role = role;
        }

        // Filter by active status
        if (isActive !== undefined) {
            query.isActive = isActive === "true";
        }

        // Pagination
        const { page: currentPage, limit: currentLimit, skip } = getPagination(page, limit);

        // Sorting
        const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

        // Query database
        const [users, totalUsers] = await Promise.all([
            user.find(query).sort(sort).skip(skip).limit(currentLimit),
            user.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalUsers / currentLimit);

        res.status(200).json({
            sucess: true,
            data: users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage,
                limit: currentLimit,
                hasNextPage: currentPage < totalPages,
                hasPrevPage: currentPage > 1
            }
        });

    } catch (error) {
        next(error);
    }
};



// Get user by id controller

export const getUserById = async (req, res, next) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid user ID"
            });
        }

        const foundUser = await user.findById(id);

        if (!foundUser) {
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            sucess: true,
            data: foundUser
        });

    } catch (error) {
        next(error);
    }
};



// Update user controller

export const updateUser = async (req, res, next) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid user ID"
            });
        }

        const { name, email, age, role } = req.body;

        // If email is updated, check if it's already in use by another user
        if (email) {
            const existingUser = await user.findOne({
                email: email.toLowerCase(),
                _id: { $ne: id }
            });

            if (existingUser) {
                return res.status(409).json({
                    sucess: false,
                    message: "Email already exist"
                });
            }
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (email !== undefined) updateData.email = email.toLowerCase().trim();
        if (age !== undefined) updateData.age = age;
        if (role !== undefined) updateData.role = role;

        const updatedUser = await user.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) {
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            sucess: true,
            message: "User updated sucessfully",
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
};



// Delete user controller

export const deleteUser = async (req, res, next) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid user ID"
            });
        }

        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            sucess: true,
            message: "User deleted sucessfully"
        });

    } catch (error) {
        next(error);
    }
};



// Update user status controller

export const updateUserStatus = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid user ID"
            });
        }

        const updatedUser = await user.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            sucess: true,
            message: "User status updated sucessfully",
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
};



// Alias export for backward compatibility
export { getUsers as getAllUsers };