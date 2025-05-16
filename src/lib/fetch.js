import axios from "axios";

export const useAuthFetch = (token, loading) => {
  return async (url) => {
    if (!loading || token) return null;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  };
};
