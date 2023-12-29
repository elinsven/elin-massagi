import axios from "axios";

export const getMassageServices = async () => {
  try {
    const { data } = await axios.get("/api/massage-services");
    return data;
  } catch (error) {
    console.error(error);
  }
};
