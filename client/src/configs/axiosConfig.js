import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

api.interceptors.response.use(undefined, (error) => {
    return Promise.reject(error)
})

export function defineCancelApiObject(apiObject) {
    // an object that will contain a cancellation handler
    // associated to each API property name in the apiObject API object
    const cancelApiObject = {}
    
    Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
        const cancellationControllerObject = {
            controller: undefined,
        }

        // associating the request cancellation handler with the API property name
        cancelApiObject[apiPropertyName] = {
            handleRequestCancellation: () => {
                // if the controller already exists,
                // canceling the request
                if (cancellationControllerObject.controller) {
                    // canceling the request and returning this custom message
                    cancellationControllerObject.controller.abort()
                }

                // generating a new controller
                // with the AbortController factory
                cancellationControllerObject.controller = new AbortController()

                return cancellationControllerObject.controller
            },
        }
    })

    return cancelApiObject
}