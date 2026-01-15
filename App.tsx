
import React, { useState } from 'react';
import { Button } from './components/Button';
import { generateSmartIdea } from './services/geminiService';
import { DeploymentStep } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const steps: DeploymentStep[] = [
    { title: "Initialize Vite", description: "Set up your React project with TypeScript using the Vite CLI.", command: "npm create vite@latest" },
    { title: "Push to GitHub", description: "Create a repository and push your local code to the cloud.", command: "git push origin main" },
    { title: "Connect to Vercel", description: "Import your repository into Vercel dashboard and configure Environment Variables." },
    { title: "Deploy", description: "Vercel automatically builds and deploys your application on every push." }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const result = await generateSmartIdea(topic);
    setAiResponse(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/5 py-4 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">V</div>
            <span className="text-xl font-bold tracking-tight">안녕하세요</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#deploy" className="hover:text-white transition-colors">Deploy Guide</a>
            <a href="#ai" className="hover:text-white transition-colors">Gemini AI</a>
          </div>
          <Button variant="outline" className="text-xs">v1.0.0</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Modern Web Apps <br />
          <span className="gradient-text">Deployed in Seconds.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The perfect template for your next project. Combining the speed of Vite, 
          the power of Gemini AI, and the reliability of Vercel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" className="px-8 py-4 text-lg">Get Started</Button>
          <Button variant="outline" className="px-8 py-4 text-lg">View Documentation</Button>
        </div>
      </section>

      {/* AI Interactive Section */}
      <section id="ai" className="max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="glass-effect rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="p-2 bg-blue-600/20 rounded-lg text-blue-400">✨</span>
            Smart Idea Generator
          </h2>
          <p className="text-slate-400 mb-8">Powered by Gemini 3 Flash. Enter a theme to generate your next big app idea.</p>
          
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Sustainable Living, Music Education..."
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
            />
            <Button variant="secondary" onClick={handleGenerate} isLoading={loading}>
              Generate Idea
            </Button>
          </div>

          {aiResponse && (
            <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700 whitespace-pre-wrap text-slate-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {aiResponse}
            </div>
          )}
        </div>
      </section>

      {/* Deployment Steps */}
      <section id="deploy" className="max-w-7xl mx-auto px-6 py-20 w-full">
        <h2 className="text-3xl font-bold mb-12 text-center">Ready for Vercel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{step.description}</p>
              {step.command && (
                <code className="bg-black/40 p-2 rounded text-xs text-blue-300 font-mono">
                  {step.command}
                </code>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold mb-2">VercelVite Showcase</span>
            <p className="text-sm text-slate-500 text-center md:text-left">Built with React, Vite, Tailwind and Gemini API.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
          </div>
          <p className="text-sm text-slate-500">© 2024 AI Solutions Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
