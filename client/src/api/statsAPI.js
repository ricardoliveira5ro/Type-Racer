import { api, defineCancelApiObject } from '../configs/axiosConfig'

export const StatsAPI = {
    postRaceStats: async (formData, cancel = false) => {
        try {
            const response = await api.request({
                url: '/stats/post-race',
                method: 'PUT',
                data: formData,
                signal: cancel ? cancelApiObject[this.postRaceStats.name].handleRequestCancellation().signal : undefined,
            })
            
            return { success: true, data: response.data }

        } catch (error) {
            return { success: false, error };
        }
    }
}

const cancelApiObject = defineCancelApiObject(StatsAPI)