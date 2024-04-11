export function generateUUID() {
  let time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (time + random) % 16 | 0;
    time = Math.floor(time / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
