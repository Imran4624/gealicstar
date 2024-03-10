



export const formatPrice = (price) => {
    try {
        return parseFloat(price).toFixed(2)
    } catch (error) {
        return '0.00'
    }
}