
const userData = require("../model/user.js");
const mongoose = require("mongoose");

const getRequest = (req, res) => {
    res.send("Welcome To Home Page");
}
const getRequest1 = (req, res) => {
    userData.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}
const postStudentData = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new userData({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        user.save().then((data) => {
            res.json({ message: "successfully insert", success: true, result: data });
        })
    }
    catch (err) {
        res.json({ error: err });
    }
}

//Registration controller API (post method)
const registrationRequest = async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new userData({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        await user.save().then((data) => {
            res.json({ message: "Sign Up successfully", success: true, result: data });
        })
    }
    catch (err) {
        res.json({ error: err });
    }
}
//Login Controller API (post method)
const loginRequest = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userData.find({ email: email,password:password });
        if (user.length > 0) {
            res.json({ message: "Login Successfully", success: true })
        }
        else {
            res.json({ message: "User not Found", success: false })
        }
    }
    catch (err) {
        res.json({ message: "incorrect email password" })
    }
}
    // update API (put)
    const updateRequest = (req, res) => {
        let { id } = req.params;
        id = mongoose.Types.ObjectId(id)
        const { email, password, firstName, lastName } = req.body;
        userData.findByIdAndUpdate(id, { "email": email, "password": password, "firstName": firstName, "lastName": lastName }, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send("record updated successfully.");
            }
        })

    }

    // Delete Api
    const deleteRequest = (req, res) => {
        let { id } = req.params;
        id = mongoose.Types.ObjectId(id);
        const { email, password, firstName, lastName } = req.body;

        userData.findByIdAndDelete(id, { "email": email, "password": password, "firstName": firstName, "lastName": lastName }, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json({message:"Delete succesfully", success:true});
            }
        })

    }

    module.exports = { getRequest, registrationRequest, getRequest1, loginRequest, updateRequest, deleteRequest, postStudentData };