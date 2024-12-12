const {validationResult} = require('express-validator')

const loginValidation = {
    email: {
        isString: true,
        isEmail: true,
        errorMessage: "Email must be a valid email address",
        notEmpty: {
            errorMessage: "Email is required and cannot be empty",
        },
        normalizeEmail: true,
        errorMessage: "Email must be a valid email address",
        escape: true, 
        trim: true
    },
    password: {
        isString: true,
        notEmpty: {
            errorMessage: "Password is required and cannot be empty",
        },
        escape: true, 
        trim: true
    },
};

const signupValidation = {
    username: {
        isString: true,
        notEmpty: {
            errorMessage: "Username is required and cannot be empty",
        },
        isLength: {
            options: {
                min: 3,
                max: 30, 
            },
            errorMessage: "Username must be between 3 and 30 characters long",
        },
        matches: {
            options: [/^[a-zA-Z0-9_.-]+$/],
            errorMessage: "Username can only contain letters, numbers, underscores (_), dots (.), and hyphens (-)",
        },
        trim: true,
        escape: true,
        customSanitizer: {
            options: (value) => value.toLowerCase()
        }
    },
    email: {
        isString: true,
        isEmail: true,
        notEmpty: {
            errorMessage: "Email is required and cannot be empty",
        },
        normalizeEmail: true,
        errorMessage: "Email must be a valid email address",
        escape: true, 
        trim: true
    },
    password: {
        isString: true,
        notEmpty: {
            errorMessage: "Password is required and cannot be empty",
        },
        isLength: {
            options: {
                min: 8, 
                max: 64,
            },
            errorMessage: "Password must be between 8 and 64 characters long",
        },
        matches: {
            options: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$/],
            errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        },
        escape: true, 
        trim: true,
    }
}

const taskValidation = {
    title: {
        isString: true,
        notEmpty: {
            errorMessage: "Task title is required and cannot be empty",
        },
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: "Task title must be between 3 and 100 characters long",
        },
        trim: true,
        escape: true,
    },
    description: {
        isString: true,
        optional: { options: { nullable: true } }, 
        isLength: {
            options: { max: 500 },
            errorMessage: "Task description cannot exceed 500 characters",
        },
        trim: true,
        escape: true,
    },
    dueDate: {
        optional: { options: { nullable: true } }, 
        isISO8601: {
            errorMessage: "Due date must be a valid ISO 8601 date",
        },
        custom: {
            options: (value) => {
                const dueDate = new Date(value);
                return dueDate >= new Date();
            },
            errorMessage: "Due date cannot be in the past",
        },
    },
    priority: {
        optional: { options: { nullable: true } },
    },
    status: {
        optional: { options: { nullable: true } },
    },
};

const validateRequest = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = []
        result.errors.forEach(item =>{
            const singleError = {}
            singleError['message'] = item['msg']
            singleError['path'] = item['path']
            errors.push(singleError)
        })

        return res.status(400).send(errors)
    }
    next();
};

module.exports = {signupValidation, loginValidation, taskValidation, validateRequest}