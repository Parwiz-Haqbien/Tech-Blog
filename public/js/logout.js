let timer, currSeconds = 0;

function resetTimer() {
    clearInterval(timer);

    currSeconds = 0;
    timer =
    setInterval(startIdleTimer, 1000);
}

window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function startIdleTimer() {
    currSeconds++;
    if (currSeconds > 60) {
        logOut();
    }
}


const logOut = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout!');
    }
};

document.querySelector('#logout').addEventListener('click', logOut);