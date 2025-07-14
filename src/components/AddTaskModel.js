import React, { useState, useEffect } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAdd, initialTitle = '', section = 'today', lists = [], tags = [] }) => {
  const [title, setTitle] = useState(initialTitle);
  const [selectedList, setSelectedList] = useState(lists[0]?.name || '');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setSelectedList(lists[0]?.name || '');
      setSelectedTags([]);
    }
  }, [isOpen, initialTitle, lists]);

  const handleTagToggle = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim(), section, selectedList, selectedTags);
      setTitle('');
      setSelectedTags([]);
      setSelectedList(lists[0]?.name || '');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={e => { if (e.key === 'Enter') handleAdd(); }}
          autoFocus
        />
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">List</label>
          <select
            className="w-full px-2 py-1 border border-gray-300 rounded-lg"
            value={selectedList}
            onChange={e => setSelectedList(e.target.value)}
          >
            {lists.map(list => (
              <option key={list.id} value={list.name}>{list.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                type="button"
                key={tag.id}
                className={`px-2 py-1 text-xs rounded border ${selectedTags.includes(tag.name) ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                onClick={() => handleTagToggle(tag.name)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;