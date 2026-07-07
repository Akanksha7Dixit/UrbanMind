const Settings = require("../models/Settings");
const User = require("../models/User");

/* =========================================
   GET SETTINGS
========================================= */

exports.getSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne({
            user: req.user.id,
        });

        // First time opening settings
        if (!settings) {

            const user = await User.findById(req.user.id);

            settings = await Settings.create({

                user: req.user.id,

                profile: {
                    fullName: user.name,
                    email: user.email,
                    city: "",
                    department: "",
                },

            });

        }

        res.json({

            success: true,
            settings,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Unable to load settings.",

        });

    }
};

/* =========================================
   UPDATE SETTINGS
========================================= */

exports.updateSettings = async (req, res) => {

    try {

        let settings = await Settings.findOne({
            user: req.user.id,
        });

        if (!settings) {

            settings = await Settings.create({
                user: req.user.id,
            });

        }

        settings.profile = req.body.profile;
        settings.notifications = req.body.notifications;
        settings.aiMode = req.body.aiMode;
        settings.gisTheme = req.body.gisTheme;

        await settings.save();

        // Update user name also
        await User.findByIdAndUpdate(

            req.user.id,

            {
                name: req.body.profile.fullName,
            }

        );

        res.json({

            success: true,

            message: "Settings updated.",

            settings,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update settings.",

        });

    }

};

/* =========================================
   RESET SETTINGS
========================================= */

exports.resetSettings = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        let settings = await Settings.findOne({

            user: req.user.id,

        });

        if (!settings) {

            settings = new Settings({

                user: req.user.id,

            });

        }

        settings.profile = {

            fullName: user.name,

            email: user.email,

            city: "",

            department: "",

        };

        settings.notifications = {

            ai: true,

            infrastructure: true,

            citizen: true,

        };

        settings.aiMode = "Balanced";

        settings.gisTheme = "Dark";

        await settings.save();

        res.json({

            success: true,

            message: "Settings reset.",

            settings,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to reset settings.",

        });

    }

};