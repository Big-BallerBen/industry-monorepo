import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, ArrowRight, Bot } from 'lucide-react';
import { generateResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
    if (!isOpen) {
        setResponse(null);
        setInput('');
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse(null);
    const result = await generateResponse(input);
    setResponse(result);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGenerate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-2xl bg-panel-black border border-electric-blue/30 shadow-[0_0_50px_rgba(0,224,255,0.1)] rounded-xl transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center bg-white/5 p-4 border-b border-white/5 rounded-t-xl">
          <span className="font-display text-xs tracking-widest text-electric-blue flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> AI OPS ARCHITECT
          </span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs text-gray-400 font-body uppercase tracking-widest">COMMAND INPUT</div>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-black/50 border border-gray-700 focus:border-electric-blue rounded-lg text-white font-body px-4 py-3 outline-none transition-all placeholder-gray-600 focus:shadow-[0_0_15px_rgba(0,224,255,0.2)]"
                placeholder="e.g., 'Draft a job post for a mixologist' or 'Analyze staffing costs'"
                autoFocus
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="absolute right-2 top-2 p-1.5 bg-electric-blue text-black rounded hover:bg-white transition-colors disabled:opacity-50"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] text-gray-500 font-mono uppercase flex items-center gap-2">
                 <Bot className="w-3 h-3" /> SYSTEM_RESPONSE
              </span>
              {isLoading && <span className="text-[10px] text-electric-blue animate-pulse">PROCESSING...</span>}
            </div>
            
            <div className="min-h-[100px] bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 leading-relaxed border border-white/5">
              {response ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>
                    {response}
                  </ReactMarkdown>
                </div>
              ) : (
                <span className="text-gray-600">// Waiting for instructions...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModal;