const showErrorDialog = (msg) => {
    const dialog = document.getElementById("evaluate-error")
    const message = document.getElementById("evaluate-error-message")
    message.innerHTML = msg
    dialog.showModal();
}

export { showErrorDialog }