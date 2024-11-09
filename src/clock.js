function displayTime() {
    const now = new Date();
    const years = now.getFullYear();
    const months = now.getMonth() + 1;
    const days = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const time = `${years}Y:${months}MN:${days}D:${hours}H:${minutes}M:${seconds.toFixed(0)}.${milliseconds}`

    document.getElementById("date").textContent = time;
} // timeDisplay

displayTime();
setInterval(displayTime, 10);
