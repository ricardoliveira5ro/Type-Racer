import { api, defineCancelApiObject } from '../configs/axiosConfig'

export const UsersAPI = {
    login: async (formData, cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/login',
                method: 'POST',
                data: formData,
                signal: cancel ? cancelApiObject[this.login.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    },

    signup: async (formData, cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/signup',
                method: 'POST',
                data: formData,
                signal: cancel ? cancelApiObject[this.signup.name].handleRequestCancellation().signal : undefined,
            })
    
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error }
        }
    },

    verifyToken: async (cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/token',
                method: 'GET',
                signal: cancel ? cancelApiObject[this.verifyToken.name].handleRequestCancellation().signal : undefined
            })

            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error }
        }
    }
}

const cancelApiObject = defineCancelApiObject(UsersAPI)