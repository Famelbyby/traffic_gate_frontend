export function getPercentile(arr: number[], p: number) {
    return arr[Math.ceil(arr.length * p / 100) - 1] || 0;
}