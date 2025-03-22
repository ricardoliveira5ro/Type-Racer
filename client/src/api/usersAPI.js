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
    },

    verifyResetToken: async (params, cancel = false) => {
        try {
            await api.request({
                url: '/users/reset-token',
                params: params,
                method: 'GET',
                signal: cancel ? cancelApiObject[this.verifyResetToken.name].handleRequestCancellation().signal : undefined
            })

            return { success: true }

        } catch (error) {
            return { success: false, error }
        }
    },


    logout: async (cancel = false) => {
        try {
            await api.request({
                url: '/users/logout',
                method: 'POST',
                signal: cancel ? cancelApiObject[this.logout.name].handleRequestCancellation().signal : undefined
            })

            return { success: true }
            
        } catch (error) {
            return { success: false, error }
        }
    },

    profile: async (cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/profile',
                method: 'GET',
                signal: cancel ? cancelApiObject[this.profile.name].handleRequestCancellation().signal : undefined
            })

            return { success: true, data: response.data }
            
        } catch (error) {
            return { success: false, error }
        }
    },

    changePassword: async (formData, cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/password',
                method: 'PUT',
                data: formData,
                signal: cancel ? cancelApiObject[this.changePassword.name].handleRequestCancellation().signal : undefined
            })

            return { success: true, data: response.data }
            
        } catch (error) {
            return { success: false, error }
        }
    },

    recoveryPassword: async (formData, cancel = false) => {
        try {
            await api.request({
                url: '/users/recovery',
                method: 'POST',
                data: formData,
                signal: cancel ? cancelApiObject[this.recoveryPassword.name].handleRequestCancellation().signal : undefined
            })

            return { success: true }
            
        } catch (error) {
            return { success: false, error }
        }
    },

    resetPassword: async (params, formData, cancel = false) => {
        try {
            await api.request({
                url: '/users/reset',
                method: 'POST',
                params: params,
                data: formData,
                signal: cancel ? cancelApiObject[this.resetPassword.name].handleRequestCancellation().signal : undefined
            })

            return { success: true }
            
        } catch (error) {
            return { success: false, error }
        }
    },

    onlinePlayers: async (cancel = false) => {
        try {
            const response = await api.request({
                url: '/users/players',
                method: 'GET',
                signal: cancel ? cancelApiObject[this.onlinePlayers.name].handleRequestCancellation().signal : undefined
            })

            return { success: true, data: response.data }
            
        } catch (error) {
            return { success: false, error }
        }
    }
}

const cancelApiObject = defineCancelApiObject(UsersAPI)