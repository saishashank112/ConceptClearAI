
import React from 'react';
import { ExplanationResponse } from '../types';
import Button from './ui/Button';

interface ExplanationViewProps {
  data: ExplanationResponse;
  onBack: () => void;
}

const ExplanationView: React.FC<ExplanationViewProps> = ({ data, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <span className="text-indigo-200 text-sm font-bold uppercase tracking-wider">Concept Explanation</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">{data.title}</h2>
        </div>
        
        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">1</span>
              The Breakdown
            </h3>
            <ul className="space-y-4">
              {data.steps.map((step, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2.5 shrink-0 group-hover:bg-indigo-600 transition-colors" />
                  <p className="text-slate-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Real-World Example
            </h3>
            <p className="text-slate-600 italic leading-relaxed">
              "{data.realWorldExample}"
            </p>
          </section>

          <section className="border-t border-slate-100 pt-6">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-indigo-900 font-semibold text-center">
                💡 {data.keyTakeaway}
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="secondary" onClick={onBack}>
          Ask Another Doubt
        </Button>
      </div>
    </div>
  );
};

export default ExplanationView;
