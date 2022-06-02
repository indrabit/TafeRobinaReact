// Import Third Party Libraries.
import { create } from 'apisauce';

// Create an API Layer.
const apiClient = create({
	// baseURL: 'http://139.218.85.171:8000/'
	baseURL: 'http://172.17.120.49:8000/'
})


// Export the API Layer.
export default apiClient;