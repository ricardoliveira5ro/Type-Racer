export const timeFormat = (ms) => {
    const second = Math.floor((ms / 1000) % 60)
        .toString()
        .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");

    return (minute + ":" + second) || "00:00"
}