import React from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';
import StickyNote from './StickyNote';

const StickyWallView = ({ stickyNotes, addNewStickyNote, deleteStickyNote, editStickyNote }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Sticky Wall</h1>
      <button
        onClick={addNewStickyNote}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        aria-label="Add new sticky note"
      >
        <Plus size={20} />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stickyNotes.map(note => (
        <StickyNote 
          key={note.id} 
          note={note} 
          onDelete={deleteStickyNote}
          onEdit={editStickyNote}
        />
      ))}

      {/* Add new sticky note card */}
      <div className="bg-gray-200 p-4 rounded-lg shadow-md border-2 border-dashed border-gray-400 flex items-center justify-center min-h-[200px] hover:bg-gray-300 transition-colors">
        <button
          onClick={addNewStickyNote}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Add new sticky note"
        >
          <Plus size={40} />
        </button>
      </div>
    </div>
  </div>
);

StickyWallView.propTypes = {
  stickyNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  addNewStickyNote: PropTypes.func.isRequired,
  deleteStickyNote: PropTypes.func.isRequired,
  editStickyNote: PropTypes.func.isRequired,
};

export default StickyWallView;