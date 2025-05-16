import axios from "axios";

const API_BASE_URL = "https://dev.codeleap.co.uk";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PostData {
  title: string;
  content: string;
  username: string;
}
export interface PostUpdateData {
  title: string;
  content: string;
}

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  author_ip: string;
}

export const getPosts = async (username?: string): Promise<Post[]> => {
  try {
    const response = await api.get("/careers/", {
      params: username ? { username } : {},
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw new Error("Não foi possível carregar os posts.");
  }
};

export const createPost = async (postData: PostData): Promise<Post> => {
  const response = await axios.post(`${API_BASE_URL}/careers/`, postData);
  return response.data;
};

export const updatePost = async (
  id: number,
  postData: PostUpdateData //createdAt
): Promise<Post> => {
  try {
    const response = await api.patch(`/careers/${id}/`, postData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw new Error("Não foi possível atualizar o post.");
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/careers/${id}/`);
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw new Error("Não foi possível deletar o post.");
  }
};

