import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseInstance = axios.create({
  baseURL: baseURL,
});

export const getQuestion = async (question: string) => {
  return await baseInstance.get(`/question/${question}`);
};
