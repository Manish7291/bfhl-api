const generateFibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const series = [0, 1];
    
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }

    return series;
};

const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }

    return true;
};

const filterPrimes = (arr) => {
    return arr.filter(num => isPrime(num));
};

const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
};

const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
};

const calculateLCM = (arr) => {
    return arr.reduce((acc, num) => lcm(acc, num), arr[0]);
};

const calculateHCF = (arr) => {
    return arr.reduce((acc, num) => gcd(acc, num), arr[0]);
};

module.exports = {
    generateFibonacci,
    filterPrimes,
    calculateLCM,
    calculateHCF
};
