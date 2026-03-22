/**
 * Service to handle registration submissions to the Ultimate Google Apps Script.
 */

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz4wkPcsSCkE5qKGcbS-J5NofgT540gNNvBgyf_AFIHorxCFo9kCOAk8hgwdK3lN5UFpQ/exec';

/**
 * Submits the registration data to the Google Apps Script for Sheet + Drive + Email automation.
 * @param {Object} submissionData - Includes formData, signatureImage, and pdfFile (base64).
 */
export const submitRegistration = async (submissionData) => {
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        console.warn('Google Sheet URL not configured. Data not sent.');
        return { success: false };
    }

    try {
        await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        });
        return { success: true };
    } catch (err) {
        console.error('Submission failed:', err);
        throw err;
    }
};
