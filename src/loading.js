function displayProgress(percentage) {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = percentage + 'px';
    progressBar.style.backgroundColor = "#FFFFFF"
} // displayProgress

function calculatePercentage() {
    let progress = 0;

    const interval = setInterval(() => {
        progress += 2;
        displayProgress(progress)

        if (progress >= 150) {
            clearInterval(interval)
            hideLoadingScreen();
        }
    }, 20);
} // calculatePercentage

function hideLoadingScreen() {
    const loadScreen = document.getElementsByClassName('loading-screen')[0];

    loadScreen.classList.add("hidden");

    setTimeout(() => {
        loadScreen.style.visibility = 'hidden';
    }, 1000);
} // hideLoadingScreen
calculatePercentage();