import { api, defineCancelApiObject } from '../configs/axiosConfig'

export const LobbyAPI = {
    find: async (isGuest = true, socketID, cancel = false) => {
        try {
            const response = await api.request({
                url: '/lobby/find',
                method: 'GET',
                headers: {
                    'X-Guest': isGuest,
                    'X-Socket-ID': socketID
                },
                signal: cancel ? cancelApiObject[this.find.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    },

    practice: async (isGuest = true, socketID, cancel = false) => {
        try {
            const response = await api.request({
                url: '/lobby/practice',
                method: 'GET',
                headers: {
                    'X-Guest': isGuest,
                    'X-Socket-ID': socketID
                },
                signal: cancel ? cancelApiObject[this.practice.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    },

    updateOrDeleteOnUserLeave: async (socketID, code, cancel = false) => {
        try {
            await api.request({
                url: `/lobby/${code}`,
                method: 'POST',
                headers: {
                    'X-Socket-ID': socketID
                },
                signal: cancel ? cancelApiObject[this.updateOrDeleteOnUserLeave.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true }

        } catch (error) {
            return { success: false, error };
        }
    },

    custom: async (socketID, params, isGuest = true, cancel = false) => {
        try {
            const response = await api.request({
                url: `/lobby/custom`,
                method: 'GET',
                params: params,
                headers: {
                    'X-Guest': isGuest,
                    'X-Socket-ID': socketID
                },
                signal: cancel ? cancelApiObject[this.custom.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    },

    startCustom: async (socketID, code, cancel = false) => {
        try {
            const response = await api.request({
                url: `/lobby/custom/${code}`,
                method: 'POST',
                headers: {
                    'X-Socket-ID': socketID
                },
                signal: cancel ? cancelApiObject[this.startCustom.name].handleRequestCancellation().signal : undefined,
            })

            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    }
}

const cancelApiObject = defineCancelApiObject(LobbyAPI)