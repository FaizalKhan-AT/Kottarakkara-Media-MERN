import axios from "../config";

export const likePost = (
  id: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  axios
    .get(`/news/like/${id}`)
    .then((res) => {
      const { status, error, data } = res.data;
      switch (status) {
        case "ok":
          break;
        case "error":
          setError(error);
          break;
      }
    })
    .catch((err) => setError("Something went wrong :( unable to like"));
};
