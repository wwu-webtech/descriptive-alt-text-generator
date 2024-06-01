/**
 * Function to display an error dialog with a given message.
 * @param {string} msg - The error message to display in the dialog.
 */
const showErrorDialog = (msg) => {
	const dialog = document.getElementById("evaluate-error");
	const message = document.getElementById("evaluate-error-message");
	message.innerHTML = msg;
	dialog.showModal();
};

export { showErrorDialog };
