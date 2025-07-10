import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const StickyNote = ({ note, onDelete, onEdit }) => (
  <div className={`${note.color} p-4 rounded-lg shadow-md relative`}>
    {/* ปุ่ม Edit และ Delete */}
    <div className="absolute top-2 right-2 flex gap-1">
      <button
        onClick={() => onEdit(note)}
        className="text-gray-600 hover:text-blue-600 transition"
        aria-label="Edit note"
      >
        <FaEdit size={12} />
      </button>
      <button
        onClick={() => onDelete(note.id)}
        className="text-gray-600 hover:text-red-600 transition"
        aria-label="Delete note"
      >
        <FaTrashAlt size={12} />
      </button>
    </div>

    {/* เนื้อหา Sticky Note */}
    <h3 className="font-semibold text-lg mb-2 pr-12">{note.title}</h3>
    <div className="text-sm whitespace-pre-line pr-4">{note.content}</div>
    
    {/* แสดงเวลาที่อัพเดทล่าสุด */}
    {note.updatedAt && (
      <div className="text-xs text-gray-500 mt-2">
        Updated: {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    )}
  </div>
);

StickyNote.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default StickyNote;