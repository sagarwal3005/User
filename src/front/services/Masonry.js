class Masonry {
    static random = (array = []) => array[Math.floor(Math.random() * array.length)];
    static locationInRow = () => {
        const location = ['align-items-start', 'align-items-around', 'align-items-end', 'align-items-center']
        const randomLocation = Masonry.random(location)
        return randomLocation
    }
    static imageSize = (width, height, anotherProperty) => {
        const randomHeight = Masonry.random(height)
        const randomWidth = Masonry.random(width)
        return { height: randomHeight, width: randomWidth, ...anotherProperty }
    }
}
module.exports = Masonry;