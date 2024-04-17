export const authHelper = {
	async getUserInfo() {
		try {
			const response = await fetch('/.auth/me');
			return response.json();
		} catch (error) {
			console.error('Error fetching user data:', error);
			return null;
		}
	},
	getUsername(userInfo) {
		return userInfo["clientPrincipal"]["userDetails"];
	}
};

document.getElementById("getUserInfo").addEventListener('click', async () => {
	const userInfo = await authHelper.getUserInfo();
	const username = authHelper.getUsername(userInfo);
	console.log(username);
});
