import { useState, type FormEvent } from "react";

interface PostFormProps {
  onCreate: (title: string, content: string) => void;
}

export default function PostForm({ onCreate }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onCreate(title.trim(), content.trim());
      setTitle("");
      setContent("");
    }
  };

  const isDisabled = !(title.trim() && content.trim());

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-md p-4 mt-6 bg-white flex flex-col gap-2"
    >
      <h2 className="font-bold">What’s on your mind?</h2>

      <div>
        <label className="text-sm block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hello world"
          className="border w-full px-3 py-2 rounded outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content here"
          className="border w-full px-3 py-2 rounded resize-none h-24 outline-none focus:ring-2"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-4 py-1 rounded text-white font-semibold transition ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          Create
        </button>
      </div>
    </form>
  );
}
