function dateFormatter(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
}

function calculateTotalPrice(diffDays, totalR, currentP) {
    if (!diffDays || !totalR || !currentP) {
        return;
    }

    let price = diffDays * currentP * totalR;
    return price;
}

function calculateTotalDays(startD, endD) {
    if (!startD || !endD) {
        return;
    }

    let diffTime = Math.abs(new Date(endD) - new Date(startD));
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}
