const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCreateUser = (req) => {

    const { name, email, role, age } = req.body;

    const error = [];


    // Name validatrion 


    if (!name || typeof name !== "string") {
        error.push("Name is required ")
    }
    else if (name.trim().length < 2) {
        error.push("Name contain atlest 2 character")
    }


    // Email validation 


    if (!email || typeof email !== "string") {
        error.push("Email is required")
    } else if (!emailRegex.test(email)) {
        error.push("Invalid email format")
    }


    // Age validation


    if (age === undefined || age === null || age === "") {
        error.push("Age is required ")
    } else if (Number(age) < 18) {
        error.push("Age must be at least 18 ");
    }

    // Role validation 

    if (role !== undefined && !["user", "admin"].includes(role)) {
        error.push("Role must be either user or admin ")
    }

    return error;
}


const validateUpdateUser = (req) => {

    const { name, role, age, email } = req.body;

    const error = [];


    // Validate empty submit 

    if (Object.keys(req.body).length === 0) {
        error.push("Atlest one field is required to update");
        return error;
    }

    // Validate name 

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim().length < 2) {
            error.push("Name must contain atleast 2 char ")
        }
    }


    //Validate email 

    if (email !== undefined) {
        if (typeof email !== "string" || !emailRegex.test(email)) {
            error.push("Invalid Email format ")
        }
    }

    // Valiadte age 

    if (age !== undefined) {
        if (Number(age) < 18) {
            error.push("Age must be 18 ")
        }
    }


    if (role !== undefined && !["user", "admin"].includes(role)) {
        error.push("Role must be either user or admin")
    }

    return error;
}


const validateUserStatus = (req) => {
    const { isActive } = req.body;

    const error = [];

    if (typeof isActive !== "boolean") {
        error.push("isActive must be a boolean ")
    }

    return error;

}

export { validateCreateUser, validateUpdateUser, validateUserStatus }