import React from 'react';
import { Plus } from 'lucide-react';
import StickyNote from './StickyNote';

const StickyWallView = ({ stickyNotes, addNewStickyNote, deleteStickyNote }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Sticky Wall</h1>
      <button
        onClick={addNewStickyNote}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Plus size={20} />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stickyNotes.map(note => (
        <StickyNote 
          key={note.id} 
          note={note} 
          onDelete={() => deleteStickyNote(note.id)} // ส่ง callback สำหรับลบ
        />
      ))}

      <div className="bg-gray-200 p-4 rounded-lg shadow-md border-2 border-dashed border-gray-400 flex items-center justify-center min-h-[200px]">
        <button
          onClick={addNewStickyNote}
          className="text-gray-600 hover:text-gray-800"
        >
          <Plus size={40} />
        </button>
      </div>
    </div>
  </div>
);

export default StickyWallView;
