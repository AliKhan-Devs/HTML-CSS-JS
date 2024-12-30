// Temperature conversion functions
export function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

export function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

export function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

export function fahrenheitToKelvin(fahrenheit) {
  return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

export function kelvinToFahrenheit(kelvin) {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

// Format number to 2 decimal places
export function formatNumber(num) {
  return Math.round(num * 100) / 100;
}