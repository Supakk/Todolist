import React, { useState } from 'react';

const AddStickyPopup = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({ title, content });
      onClose();
      setTitle('');
      setContent('');
    }
  };

  if (!isOpen) return null; // ✅ เพิ่มตรงนี้

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Sticky Note</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded mb-3"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStickyPopup;
