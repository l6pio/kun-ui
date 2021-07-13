export const Severity = {
    4: "High",
    3: "Medium",
    2: "Low",
    1: "Negligible",
    0: "Unknown"
};

export const FixState = {
    3: "Fixed",
    2: "Not Fixed",
    1: "Won't Fix",
    0: "Unknown"
};

export const niceBytes = function (x) {
    const units = ["", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l]);
};
