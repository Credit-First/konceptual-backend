const User = require("../models/User");
const roles = require("../config/role");
const AuthHelpers = require("../helpers/auth");

module.exports.loginUser = async function (req, res) {
    const { wallet_address } = req.body;

    try {
        let registeredUser = await User.findOne({ wallet_address });
        if (!registeredUser) {
            res.status(404).send({ success: false, msg: "Non Registered User!" });

            return;
        }

        res.status(200).send({
            success: true,
            user: registeredUser,
            token: AuthHelpers.generateToken({
                username: registeredUser.username,
                email: registeredUser.email,
                wallet_address: registeredUser.wallet_address,
                role: registeredUser.role
            })
        });

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.session = async function (req, res) {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ');

    try {
        const { wallet_address } = AuthHelpers.verifyToken(token[1]);

        let registeredUser = await User.findOne({ wallet_address });
        if (!registeredUser) {
            res.status(404).send({ success: false, msg: "Non Registered User!" });

            return;
        }

        res.status(200).send({
            success: true,
            user: registeredUser,
            token: AuthHelpers.generateToken({
                username: registeredUser.username,
                email: registeredUser.email,
                wallet_address: registeredUser.wallet_address,
                role: registeredUser.role
            })
        });

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.registerUser = async function (req, res) {
    const { username, email, wallet_address } = req.body;

    try {
        let isRegistered = await User.exists({ $or: [{ username }, { email }, { wallet_address }] });
        if (isRegistered) {
            res.status(409).send({ success: false, msg: "Registered User!" });

            return;
        }

        let user = new User({ username, email, wallet_address, role: roles["user"] });
        await user.save();

        res.status(200).send({ success: true, token: AuthHelpers.generateToken({ username, email, wallet_address }) });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
}