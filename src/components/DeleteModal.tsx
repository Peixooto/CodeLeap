interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-lg">
        <p className="text-lg font-bold mb-6">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-6">
          <button
            onClick={onClose}
            className="px-6 py-1 border rounded hover:bg-gray-100 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-1 bg-red-500 text-white rounded hover:bg-red-400 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}