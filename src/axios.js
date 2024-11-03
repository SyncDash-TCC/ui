import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = 'http://localhost:8002/';

const instance = axios.create({
	// eslint-disable-next-line no-undef
	headers: {
		"Content-Type": "application/json"
	}
});

const instanceFormData = axios.create({
	// eslint-disable-next-line no-undef
	headers: {
		"Content-Type": "multipart/form-data",
	}
});

instanceFormData.interceptors.request.use(config => {
	let token = Cookies.get("tk");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
			.replace(/(^)|($)/g, "");
	}
	return config;
}, err => {
	return Promise.reject(err);
});

instance.interceptors.request.use(config => {
	let token = Cookies.get("tk");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
			.replace(/(^)|($)/g, "");
	}
	return config;
}, err => {
	return Promise.reject(err);
});

export default {
    // ======== AUTENTICATION ========
	GetLogin(data) {
		return instance.post("auth/login", data);
	},
	GetUserInfo(data) {
		return instance.get("auth/detail", data);
	},
	CreateAccount(data) {
		return instance.post("auth/register", data);
	},
	// ======== PLANILHA ========
	PostPlanilha(data) {
		return instance.post("planilha/register", data);
	},
	SendUploadPlanilha(data) {
		return instanceFormData.put("planilha/upload", data);
	},
	// ======== DASHBOARD ========
	GetDashboard(data) {
		return instance.get("dashboard/detail", data);
	},
};