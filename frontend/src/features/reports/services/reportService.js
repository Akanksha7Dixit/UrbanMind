import axiosInstance from "../../../api/axiosInstance";

/* ===========================================
   GET ALL REPORTS
=========================================== */

export const getReports = async () => {

    const { data } = await axiosInstance.get(
        "/reports"
    );

    return data;

};

/* ===========================================
   GET SINGLE REPORT
=========================================== */

export const getReportById = async (id) => {

    const { data } = await axiosInstance.get(
        `/reports/${id}`
    );

    return data;

};

/* ===========================================
   DOWNLOAD PDF
=========================================== */

export const downloadPDF = async (id) => {

    const response = await axiosInstance.get(

        `/reports/${id}/pdf`,

        {

            responseType: "blob",

        }

    );

    return response.data;

};

/* ===========================================
   DOWNLOAD EXCEL
=========================================== */

export const downloadExcel = async (id) => {

    const response = await axiosInstance.get(

        `/reports/${id}/excel`,

        {

            responseType: "blob",

        }

    );

    return response.data;

};

/* ===========================================
   DOWNLOAD PPT
=========================================== */

export const downloadPresentation = async (id) => {

    const response = await axiosInstance.get(

        `/reports/${id}/ppt`,

        {

            responseType: "blob",

        }

    );

    return response.data;

};

/* ===========================================
   DELETE REPORT
=========================================== */

export const deleteReport = async (id) => {

    const { data } = await axiosInstance.delete(

        `/reports/${id}`

    );

    return data;

};

/* ===========================================
   ARCHIVE REPORT
=========================================== */

export const archiveReport = async (id) => {

    const { data } = await axiosInstance.patch(

        `/reports/${id}/archive`

    );

    return data;

};
/* ===========================================
   CREATE REPORT
=========================================== */
export const createReport = async (body) => {

    console.log(
        "SERVICE RECEIVED:",
        body
    );

    console.log(
        "BODY TYPE:",
        typeof body
    );

    const { data } =
        await axiosInstance.post(
            "/reports",
            body
        );

    return data;
};