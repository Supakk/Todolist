import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { COLORS } from './constants';
import { TagPropType } from '../hooks/types';
import { validateTag } from '../hooks/validation';

const getColorClass = (color) => color || 'bg-gray-200 text-gray-800';

const Tags = ({ tags, setTags }) => {
  const [adding, setAdding] = useState(false);
  const [input, setInput] = useState({ name: '', color: COLORS[0].bg + ' ' + COLORS[0].text });
  const [error, setError] = useState('');

  const handleAdd = () => {
    const newTag = {
      id: Date.now(),
      name: input.name.trim(),
      color: input.color,
    };
    const validation = validateTag(newTag);
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }
    setTags(prev => [...prev, newTag]);
    setInput({ name: '', color: COLORS[0].bg + ' ' + COLORS[0].text });
    setAdding(false);
    setError('');
  };

  const handleDelete = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">TAGS</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag.id} className={`px-2 py-1 text-xs rounded ${tag.color} flex items-center gap-1`}>
            {tag.name}
            <button onClick={() => handleDelete(tag.id)} className="text-red-500 hover:text-red-700 ml-1"><Trash2 size={12} /></button>
          </span>
        ))}
        {adding ? (
          <span className="px-2 py-1 text-xs rounded bg-gray-50 flex items-center gap-1">
            <input
              className="border px-1 py-0.5 rounded text-xs mr-1"
              value={input.name}
              onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
              placeholder="Tag name"
              maxLength={30}
              autoFocus
            />
            <select
              className="border px-1 py-0.5 rounded text-xs mr-1"
              value={input.color}
              onChange={e => setInput(i => ({ ...i, color: e.target.value }))}
            >
              {COLORS.map(c => (
                <option key={c.bg} value={c.bg + ' ' + c.text}>{c.name}</option>
              ))}
            </select>
            <button onClick={handleAdd} className="text-green-600 hover:text-green-800"><Check size={14} /></button>
            <button onClick={() => { setAdding(false); setError(''); }} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
          </span>
        ) : (
          <button onClick={() => { setAdding(true); setInput({ name: '', color: COLORS[0].bg + ' ' + COLORS[0].text }); }} className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            + Add Tag
          </button>
        )}
      </div>
      {error && <div className="text-xs text-red-500 mt-1 ml-1">{error}</div>}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(TagPropType).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default Tags; 