export const getCover = (path: string) => {
  return path.startsWith("/upload") ? "http://127.0.0.1:3001" + path : path;
};
