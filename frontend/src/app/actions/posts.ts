import { apiFetch } from './fetch';

export const createPost = async (content: string) => {
  try {
    const response = await apiFetch('api/posts', {
      method: 'POST',
      body: { content },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};


export const getPosts = async () => {
  try {
    const response = await apiFetch('api/posts', {
      method: 'GET',
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

export const updatePost = async (id: string, content: string) => {
  try {
    const response = await apiFetch(`api/posts/${id}`, {
      method: 'PUT',
      body: { content },
    });
    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await apiFetch(`api/posts/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};


export const likePost = async (id: string) => {
  try {
    const response = await apiFetch(`api/posts/${id}/like`, {
      method: 'POST',
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

// ... existing imports and code ...

interface CommentData {
  postId: string;
  content: string;
}

export const addComment = async (commentData: CommentData) => {
  try {
    const response = await apiFetch(`api/posts/${commentData.postId}/comments`, {
      method: 'POST',
      body: { content: commentData.content }
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to add comment');
  }
};