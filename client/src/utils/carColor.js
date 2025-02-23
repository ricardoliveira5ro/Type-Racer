export const carColor = (index) => {
    switch (index) {
        case 1:
            return require('../assets/images/car-green.webp')
        case 2:
            return require('../assets/images/car-blue.webp')
        case 3:
            return require('../assets/images/car-red.webp')
        case 4:
            return require('../assets/images/car-yellow.webp')
        default:
            return require('../assets/images/car-green.webp')
    }
}