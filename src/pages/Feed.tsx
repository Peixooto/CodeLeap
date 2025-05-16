import { useState, useEffect } from "react";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/Api";

import type { Post as ApiPost,PostData } from "../services/Api";

interface Post extends Omit<ApiPost, "createdAt"> {
  createdAt: Date;
  id: number; 
}


interface FeedProps {
  currentUser: string;
}

export default function Feed({ currentUser }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((data) => {
        const postsWithDate = data.map((p) => ({
          ...p,
          createdAt: new Date(p.created_datetime),
        }));
        setPosts(postsWithDate);
      })
      .catch(() => setError("Erro ao carregar posts."))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (title: string, content: string) => {
    const newPostData: PostData = { title, content,username: currentUser };
    try {
      const created = await createPost(newPostData);
      const createdWithDate = {
        ...created,
        createdAt: new Date(created.created_datetime),
      };
      setPosts((prev) => [createdWithDate, ...prev]);
    } catch {
      setError("Erro ao criar post.");
    }
  };

  const openModal = (id: number) => {
    setPostToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete === null) return;
    try {
      await deletePost(postToDelete);
      setPosts((prev) => prev.filter((p) => p.id !== postToDelete));
      setModalOpen(false);
      setPostToDelete(null);
    } catch {
      setError("Erro ao deletar post.");
    }
  };

  const handleEdit = (id: number) => {
    const post = posts.find((p) => p.id === id) ?? null;
    setPostToEdit(post);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (title: string, content: string) => {
    if (!postToEdit?.id) return;
    try {
      const updated = await updatePost(postToEdit.id, {
        title,
        content,
      });
      const updatedWithDate = {
        ...updated,
        createdAt: new Date(updated.created_datetime),
      };
      setPosts((prev) =>
        prev.map((p) => (p.id === postToEdit.id ? updatedWithDate : p))
      );
      setEditModalOpen(false);
      setPostToEdit(null);
    } catch {
      setError("Erro ao atualizar post.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg ">
      <Header />
      <main className="g-white rounded-lg shadow-lg p-6 space-y-6">
        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <PostForm onCreate={handleCreate} />

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post,idx) => (
            <PostCard
              key={post.id ?? idx}
              post={post}
              currentUser={currentUser}
              onEdit={handleEdit}
              onDelete={openModal}
            />
          ))
        )}

        <DeleteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
        />

        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
          currentTitle={postToEdit?.title ?? ""}
          currentContent={postToEdit?.content ?? ""}
          postId={postToEdit?.id ?? null}
        />
      </main>
      </div>
      </div>
    </>
  );
}
