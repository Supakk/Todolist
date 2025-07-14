import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StickyNote from './StickyNote';

const StickyWallView = ({ stickyNotes, addNewStickyNote, deleteStickyNote, editStickyNote }) => {
  const [viewNote, setViewNote] = useState(null);

  // Generic color map (match by keyword)
  const BASIC_COLOR_MAP = {
    'blue': '#dbeafe',
    'green': '#d1fae5',
    'yellow': '#fef9c3',
    'red': '#fee2e2',
    'purple': '#ede9fe',
    'pink': '#fce7f3',
    'orange': '#ffedd5',
    'indigo': '#e0e7ff',
  };

  function getSolidColor(color) {
    console.log("➡️ getSolidColor input:", color);

    if (!color) {
      console.warn("⚠️ No color provided, fallback to #f5f5f5");
      return '#f5f5f5';
    }

    if (color.startsWith('#') || color.startsWith('rgb')) {
      console.log("✅ Direct hex/rgb color:", color);
      return color;
    }

    // Try generic color keyword matching
    for (const key in BASIC_COLOR_MAP) {
      if (color.toLowerCase().includes(key)) {
        console.log(`✅ Matched ${color} -> ${BASIC_COLOR_MAP[key]}`);
        return BASIC_COLOR_MAP[key];
      }
    }

    console.warn("❌ Unknown color:", color, "- fallback");
    return '#f5f5f5';
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Sticky Wall</h1>
        <button
          onClick={addNewStickyNote}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Add new sticky note"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stickyNotes.map(note => (
          <StickyNote 
            key={note.id} 
            note={note} 
            onDelete={deleteStickyNote}
            onEdit={editStickyNote}
            onClick={() => note.content && setViewNote(note)}
          />
        ))}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md border-2 border-dashed border-gray-400 flex items-center justify-center min-h-[200px] hover:bg-gray-300 transition-colors">
          <button
            onClick={addNewStickyNote}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Add new sticky note"
          >
            +
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {viewNote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg shadow-xl w-full max-w-md relative border-2 border-white"
            style={{
              background: getSolidColor(viewNote.color),
              backgroundColor: getSolidColor(viewNote.color),
              boxShadow: '0 4px 32px rgba(0,0,0,0.18)'
            }}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
              onClick={() => setViewNote(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#222' }}>{viewNote.title}</h2>
            <div className="whitespace-pre-line mb-4" style={{ color: '#222' }}>{viewNote.content}</div>
            {viewNote.updatedAt && (
              <div className="text-xs mt-2" style={{ color: '#444' }}>
                Updated: {new Date(viewNote.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
