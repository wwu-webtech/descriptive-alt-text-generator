export const AuthHelper = {
	async getUserInfo() {
		try {
			const response = await fetch("/.auth/me");
			return response.json();
		} catch (error) {
			console.error("Error fetching user data:", error);
			return null;
		}
	},
	async getUsername() {
		// If running locally, return a default username as /.auth/me does not exist
		if (window.location.hostname === "localhost") {
			return "localUser@test.com";
		} else {
			const userInfo = await this.getUserInfo();
			return userInfo["clientPrincipal"]["userDetails"];
		}
	},
};
/*
document.getElementById("getUserInfo").addEventListener("click", async () => {
	return AuthHelper.getUsername();
});*/

document.getElementById("username").innerHTML = await AuthHelper.getUsername();
