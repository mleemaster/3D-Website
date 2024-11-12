function displayTime() {
    const now = new Date();
    const years = now.getFullYear();
    let months = now.getMonth() + 1;
    let days = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    // add leading 0s to single digit time units to maintain formatting
    months = months < 10 ? '0' + months : months;
    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    milliseconds = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;

    // format date and time
    const time = `${years}:${months}:${days} | ${hours}:${minutes}:${seconds.toFixed(0)}.${milliseconds}`;

    document.getElementById("date").textContent = time;
} // timeDisplay

displayTime();

// update the time every 10 milliseconds
setInterval(displayTime, 10);
