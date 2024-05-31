/**
 * Function to get the character limit based on the user's selection.
 * @param {boolean} isFile - Determines if the input is a file or a URL.
 * @returns {number} - The character limit (140, 280, or -1 for no limit).
 */
const getCharLimit = (isFile) => {
    let limit = 0;

    let short, long
    if (isFile) {
        short = document.getElementById("limit-response-140").checked
        long = document.getElementById("limit-response-280").checked
    } else {
        short = document.getElementById("limit-response-140-url").checked
        long = document.getElementById("limit-response-280-url").checked
    }


    if (short) {
        limit = 140;
    } else if (long) {
        limit = 280;
    } else {
        limit = -1;
    }
    return limit;
}

export { getCharLimit }