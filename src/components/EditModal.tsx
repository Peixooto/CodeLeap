
import { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (  title: string, content: string) => Promise<void>;
  postId: number | null;
  currentTitle: string;
  currentContent: string;
}

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  postId,
  currentTitle,
  currentContent,
}: EditModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
     if (isOpen){
      setTitle(currentTitle);
      setContent(currentContent);
      setError(null);
    }
  }, [currentTitle, currentContent, isOpen]);

  const handleSubmit = async () => {
    if (!postId) return;
    setIsSaving(true);
    setError(null);
    
    try {
      await onSave( title, content);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormInvalid = title.trim() === "" || content.trim() === "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-lg">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>

        <label className="text-sm mb-1 block">Title</label>
        <input
          className="w-full border px-2 py-1 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSaving}
        />

        <label className="text-sm mb-1 block">Content</label>
        <textarea
          className="w-full border px-2 mb-4 rounded resize-none"
          value={content}
          rows={4}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSaving}
        />

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-2 border rounded hover:bg-gray-100 font-semibold"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded text-white ${
              isFormInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 font-semibold"
            }`}
            onClick={handleSubmit}
            disabled={isFormInvalid || isSaving}
          >
             {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
