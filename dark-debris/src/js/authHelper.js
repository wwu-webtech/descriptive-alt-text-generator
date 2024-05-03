export const authHelper = {
	async getUserInfo() {
		try {
			const response= await fetch('/.auth/me');
			return response.json();
		} catch (error) {
			console.error('Error fetching user data:', error);
			return null;
		}
	},
	getUsername() {
		const userInfo = this.getUserInfo();
		if (!userInfo) {
			console.error('No user info provided, must be testing locally');
			return "testuser";
		}
		return userInfo["clientPrincipal"]["userDetails"];
	}
};
