import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class GalleryService {
	createFolder(formData, token) {
		return axios.post(`${BACKEND_API_URL}/folders`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	uploadImage(formData, token) {
		return axios.post(`${BACKEND_API_URL}/gallery`, formData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchFolders(token) {
		return axios.get(`${BACKEND_API_URL}/folders`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchImages(token, currentPage) {
		return axios.get(`${BACKEND_API_URL}/gallery`, {
			params: {
				page: currentPage,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchImageByFolder(token, id, currentPage) {
		return axios.get(`${BACKEND_API_URL}/folders/${id}`, {
			params: {
				page: currentPage,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	deleteImage(token, id) {
		return axios.delete(`${BACKEND_API_URL}/gallery/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new GalleryService()
