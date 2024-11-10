function displayProgress(percentage) {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = percentage + 'px';
    progressBar.style.backgroundColor = "#FFFFFF"
}

function calculatePercentage() {
    let progress = 0;
    const loadScreen = document.getElementsByClassName('loading-screen')[0];

    const interval = setInterval(() => {
        progress += 2;
        displayProgress(progress)

        if (progress >= 150) {
            clearInterval(interval)
            loadScreen.style.visibility = 'hidden';
        }
    }, 20);
}

calculatePercentage();