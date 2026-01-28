
import React, { useState } from 'react';
import { ConceptFormData } from '../types';
import Button from './ui/Button';

interface HomeViewProps {
  onSubmit: (data: ConceptFormData) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ConceptFormData>({
    subject: '',
    topic: '',
    confusion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim() || !formData.confusion.trim()) return;
    onSubmit(formData);
  };

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Computer Science', 'History', 'Other'];

  return (
    <div className="max-w-xl mx-auto px-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subject (Optional)</label>
            <select 
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
            >
              <option value="">Select a subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Question or Topic</label>
            <input 
              type="text"
              required
              placeholder="e.g., Quantum Entanglement, Supply & Demand"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">What exactly are you confused about? *</label>
            <textarea 
              required
              rows={4}
              placeholder="e.g., I don't get how two particles can influence each other instantly over long distances."
              value={formData.confusion}
              onChange={(e) => setFormData(prev => ({ ...prev, confusion: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 resize-none"
            />
            <p className="text-xs text-slate-400 mt-2">Be as specific as possible for the best explanation.</p>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={!formData.topic || !formData.confusion}
          >
            Explain Concept
          </Button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-start">
        <div className="p-1 bg-amber-100 rounded-full text-amber-600 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-amber-800 leading-relaxed">
          ConceptClear is for learning concepts, not for doing your homework. Focus on the "why" and "how"!
        </p>
      </div>
    </div>
  );
};

export default HomeView;
