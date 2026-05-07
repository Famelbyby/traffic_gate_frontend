export function findCookie(cookieName: string) {
    return document.cookie.split(';').find((str) => str.includes(cookieName));
}