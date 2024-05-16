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