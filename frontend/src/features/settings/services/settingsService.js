import axiosInstance from "../../../api/axiosInstance";

/* =========================================
   GET SETTINGS
========================================= */

export const getSettings = async () => {

    const { data } = await axiosInstance.get(
        "/settings"
    );

    return data.settings;

};

/* =========================================
   UPDATE SETTINGS
========================================= */

export const updateSettings = async (settings) => {

    const { data } = await axiosInstance.put(
        "/settings",
        settings
    );

    return data.settings;

};

/* =========================================
   RESET SETTINGS
========================================= */

export const resetSettings = async () => {

    const { data } = await axiosInstance.delete(
        "/settings"
    );

    return data.settings;

};