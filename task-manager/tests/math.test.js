const math = require('../src/math')

test('Tip Test : 12.5', () => {
    const total = math.calculateTip(10)
    expect(total).toBe(12)
})

test('Tip Test : 13', () => {
    const total = math.calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should convert 32 - 0', () => {
    const temp = math.fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('Should convert 0 - 32', () => {
    const temp = math.celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})