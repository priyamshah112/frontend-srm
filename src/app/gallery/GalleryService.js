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
	fetchSharedFolders(token) {
		return axios.get(`${BACKEND_API_URL}/folders/shared`, {
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
	fetchSharedImages(token, currentPage) {
		return axios.get(`${BACKEND_API_URL}/gallery/shared`, {
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
	fetchSharedImageByFolder(token, id, currentPage) {
		return axios.get(`${BACKEND_API_URL}/folders/shared/${id}`, {
			params: {
				page: currentPage,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	moveImagesToFolder(token,payload){		
		return axios.put(`${BACKEND_API_URL}/folders/move`, payload, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	renameFolder(token,payload){		
		return axios.put(`${BACKEND_API_URL}/folders/rename`, payload, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	shareto(token,id,payload){
		return axios.put(`${BACKEND_API_URL}/folders/share/${id}`, payload, {
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
	deleteFolder(token, id) {
		return axios.delete(`${BACKEND_API_URL}/folders/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchClasses(token) {
		return axios.get(`${BACKEND_API_URL}/classes`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new GalleryService()
