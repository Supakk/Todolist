import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { COLORS } from './constants';
import { ListPropType } from '../hooks/types';
import { validateList } from '../hooks/validation';

const getColorClass = (color) => color || 'bg-gray-300';

const Lists = ({ lists, setLists }) => {
  const [adding, setAdding] = useState(false);
  const [input, setInput] = useState({ name: '', color: COLORS[0].bg });
  const [error, setError] = useState('');

  const handleAdd = () => {
    const newList = {
      id: Date.now(),
      name: input.name.trim(),
      color: input.color,
      count: 0,
    };
    const validation = validateList(newList);
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }
    setLists(prev => [...prev, newList]);
    setInput({ name: '', color: COLORS[0].bg });
    setAdding(false);
    setError('');
  };

  const handleDelete = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">LISTS</h3>
      <ul className="space-y-2">
        {lists.map(list => (
          <li key={list.id}>
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${list.color} rounded-full mr-3`}></div>
                <span>{list.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{list.count}</span>
                <button onClick={() => handleDelete(list.id)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
              </div>
            </div>
          </li>
        ))}
        {adding ? (
          <li>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <input
                className="border px-2 py-1 rounded text-sm flex-1"
                value={input.name}
                onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
                placeholder="List name"
                maxLength={50}
                autoFocus
              />
              <select
                className="border px-2 py-1 rounded text-sm"
                value={input.color}
                onChange={e => setInput(i => ({ ...i, color: e.target.value }))}
              >
                {COLORS.map(c => (
                  <option key={c.bg} value={c.bg}>{c.name}</option>
                ))}
              </select>
              <button onClick={handleAdd} className="text-green-600 hover:text-green-800"><Check size={16} /></button>
              <button onClick={() => { setAdding(false); setError(''); }} className="text-gray-500 hover:text-gray-700"><X size={16} /></button>
            </div>
          </li>
        ) : (
          <li>
            <button onClick={() => { setAdding(true); setInput({ name: '', color: COLORS[0].bg }); }} className="w-full text-left p-2 rounded hover:bg-gray-200 flex items-center text-gray-600">
              <Plus size={16} className="mr-2" />
              Add New List
            </button>
          </li>
        )}
      </ul>
      {error && <div className="text-xs text-red-500 mt-1 ml-1">{error}</div>}
    </div>
  );
};

Lists.propTypes = {
  lists: PropTypes.arrayOf(ListPropType).isRequired,
  setLists: PropTypes.func.isRequired,
};

export default Lists; 