const Settings = require("../models/Settings");

/* ============================================================
   GET USER SETTINGS
============================================================ */

exports.getSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne({
            user: req.user.id,
        });

        // First login → create default settings
        if (!settings) {

            settings = await Settings.create({

                user: req.user.id,

            });

        }

        return res.status(200).json({

            success: true,

            settings,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch settings.",

        });

    }

};


/* ============================================================
   UPDATE SETTINGS
============================================================ */

exports.updateSettings = async (req, res) => {

    try {

        const settings = await Settings.findOneAndUpdate(

            {
                user: req.user.id,
            },

            req.body,

            {
                new: true,
                upsert: true,
                runValidators: true,
            }

        );

        return res.status(200).json({

            success: true,

            message: "Settings updated successfully.",

            settings,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to update settings.",

        });

    }

};


/* ============================================================
   RESET SETTINGS
============================================================ */

exports.resetSettings = async (req, res) => {

    try {

        await Settings.findOneAndDelete({

            user: req.user.id,

        });

        const settings = await Settings.create({

            user: req.user.id,

        });

        return res.status(200).json({

            success: true,

            message: "Settings reset successfully.",

            settings,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to reset settings.",

        });

    }

};