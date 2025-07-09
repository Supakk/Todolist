const ConfirmDeletePopup = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm} // ✅ ใช้ prop ที่ถูกส่งจาก App.js
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
