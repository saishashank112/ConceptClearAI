
import React, { useState, useCallback } from 'react';
import { AppView, ConceptFormData, ExplanationResponse } from './types';
import { getConceptExplanation } from './services/geminiService';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ExplanationView from './components/ExplanationView';
import LoadingView from './components/LoadingView';
import Button from './components/ui/Button';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (formData: ConceptFormData) => {
    setView('loading');
    setError(null);
    try {
      const result = await getConceptExplanation(formData);
      setExplanation(result);
      setView('explanation');
    } catch (err) {
      console.error(err);
      setError("We couldn't generate an explanation right now. Please try again.");
      setView('error');
    }
  }, []);

  const handleBackToHome = () => {
    setExplanation(null);
    setError(null);
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto">
      <Header />
      
      <main className="flex-grow">
        {view === 'home' && (
          <HomeView onSubmit={handleFormSubmit} />
        )}

        {view === 'loading' && (
          <LoadingView />
        )}

        {view === 'explanation' && explanation && (
          <ExplanationView data={explanation} onBack={handleBackToHome} />
        )}

        {view === 'error' && (
          <div className="px-4 py-12 text-center animate-in fade-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">{error}</p>
            <Button variant="primary" onClick={handleBackToHome}>
              Try Again
            </Button>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} ConceptClear. Empowering learners everywhere.</p>
      </footer>
    </div>
  );
};

export default App;
