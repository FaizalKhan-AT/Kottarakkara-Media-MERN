export const toYTEmbed = (url: string) => {
  let result: string = "https://www.youtube.com/embed/";
  if (url.includes("youtube.com/watch?v=")) {
    let id = url.split("?v=")[1];
    result = result + id;
  } else if (url.includes("youtu.be/")) {
    let id = url.split("youtu.be/")[1];
    result = result + id;
  }

  return result;
};
