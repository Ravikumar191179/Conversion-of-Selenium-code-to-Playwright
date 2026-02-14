'use client';

import { useState } from 'react';
import { Play, Save, FileCode, Bot, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { convertSeleniumToPlaywright } from '@/lib/converter';

export default function Converter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [filename, setFilename] = useState('ConvertedTest.ts');
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
    const [msg, setMsg] = useState('');

    // New State for Conversion Mode
    const [mode, setMode] = useState<'heuristic' | 'ai'>('ai');
    const [aiModel, setAiModel] = useState('codellama');

    const handleConvert = async () => {
        setStatus('loading');
        setMsg('Converting...');

        try {
            let result = '';

            if (mode === 'heuristic') {
                // Client-side Rule-Based
                result = convertSeleniumToPlaywright(input);
                setOutput(result);
                setStatus('idle');
                setMsg('');
            } else {
                // Server-side AI
                const res = await fetch('/api/convert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: input, model: aiModel }),
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'AI Conversion failed');

                result = data.code;
                setOutput(result);
                setStatus('idle');
                setMsg('');
            }
        } catch (e: any) {
            console.error(e);
            setStatus('error');
            setMsg(e.message || 'Conversion failed');
        }
    };

    const handleSave = async () => {
        if (!output) return;
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: output, filename }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMsg(`Saved to ${data.path}`);
            } else {
                setStatus('error');
                setMsg(data.error || 'Failed to save');
            }
        } catch (e) {
            setStatus('error');
            setMsg('Network error');
        }
    };

    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto p-4">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-800 dark:border-zinc-700 gap-4">
                <div className="flex items-center gap-2">
                    <FileCode className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Selenium to Playwright</h1>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg dark:bg-zinc-900">
                    <button
                        onClick={() => setMode('heuristic')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'heuristic' ? 'bg-white shadow text-indigo-600 dark:bg-zinc-700 dark:text-indigo-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        <Zap className="w-4 h-4" />
                        Fast (Regex)
                    </button>
                    <button
                        onClick={() => setMode('ai')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'ai' ? 'bg-white shadow text-indigo-600 dark:bg-zinc-700 dark:text-indigo-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        <Bot className="w-4 h-4" />
                        AI (Ollama)
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300 w-40"
                        placeholder="Filename.ts"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={status === 'loading'}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        Convert
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!output}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${!output ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-300 dark:border-zinc-700'}`}
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 grid grid-cols-2 gap-4 min-h-[500px]">
                {/* Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Java Selenium Input</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300"
                        placeholder="// Paste your Selenium Java code here..."
                        spellCheck={false}
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col gap-2 relative">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Playwright TypeScript Output</label>
                        {mode === 'ai' && <span className="text-xs text-indigo-500 font-medium flex items-center gap-1"><Bot className="w-3 h-3" /> Model: {aiModel}</span>}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="flex-1 w-full p-4 font-mono text-xs md:text-sm bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 outline-none resize-none dark:bg-zinc-900/50 dark:border-indigo-900/30 dark:text-indigo-200"
                        placeholder="// Converted code will appear here..."
                        spellCheck={false}
                    />
                    {(status === 'success' || status === 'error') && (
                        <div className={`absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {msg}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
