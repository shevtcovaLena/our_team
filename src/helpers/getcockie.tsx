export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const result = parts.pop()?.split(';').shift();
        return result || null;
      }
    return null;
}