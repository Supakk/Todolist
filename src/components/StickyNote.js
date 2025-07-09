import React from 'react';
import { X } from 'lucide-react';

const StickyNote = ({ note, onDelete }) => (
  <div className={`${note.color} p-4 rounded-lg shadow-md relative`}>
    {/* ปุ่มลบ */}
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
      aria-label="Delete note"
    >
      <X size={18} />
    </button>

    {/* เนื้อหา Sticky Note */}
    <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
    <div className="text-sm whitespace-pre-line">{note.content}</div>
  </div>
);

export default StickyNote;
