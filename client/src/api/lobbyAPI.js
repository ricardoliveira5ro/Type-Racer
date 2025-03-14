import { api, defineCancelApiObject } from '../configs/axiosConfig'

export const LobbyAPI = {
    find: async (isGuest = true, cancel = false) => {
        try {
            const response = await api.request({
                url: '/lobby/find',
                method: 'GET',
                headers: {
                    'X-Guest': isGuest
                },
                signal: cancel ? cancelApiObject[this.find.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    }
}

const cancelApiObject = defineCancelApiObject(LobbyAPI)