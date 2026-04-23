"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, File, Download, Loader2, CheckCircle2, 
  ArrowRight, Settings2, ShieldCheck, Zap, Heart, 
  Rocket, Sparkles, Wand2, Layers, MessageSquare, 
  Share2, Copy, Check, Bot
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';

interface ToolWorkspaceProps {
  toolId: string;
  toolName: string;
  onBack: () => void;
}

import SmartSuggestions from './SmartSuggestions';
import AIChat from './AIChat';
import { useFileHistory } from '@/hooks/useFileHistory';

const ToolWorkspace = ({ toolId, toolName, onBack }: ToolWorkspaceProps) => {
  const { user, refreshUser } = useAuth();
  const { addToHistory } = useFileHistory();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>(['pdf']);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [aiSummary, setAiSummary] = useState<string[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  React.useEffect(() => {
    if (files.length > 0 && !aiSummary && !isAnalyzing) {
      generateAiSummary();
    }
  }, [files]);

  const generateAiSummary = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiSummary([
      "Document contains high-density vector graphics and embedded fonts.",
      "Detected 12 distinct pages with structured heading hierarchy.",
      "File is optimized for web viewing but requires compression for email."
    ]);
    setIsAnalyzing(false);
  };

  // DISABLE LIMIT FOR FREE LAUNCH
  const isLimitReached = false; 

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    // 50MB limit check
    const oversizedFiles = uploadedFiles.filter(f => f.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large! Max file size is 50MB. Oversized: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const addFiles = (newFiles: File[]) => {
    const oversizedFiles = newFiles.filter(f => f.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large! Max file size is 50MB. Oversized: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    const validFiles = newFiles.slice(0, 10);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleSmartAction = (action: string) => {
    console.log("Smart action selected:", action);
    // In a real app, this would change the current tool context or trigger a specific process
    processFiles();
  };

  const processFiles = async (isFix = false) => {
    if (files.length === 0 && toolId !== 'text-to-speech') return;
    
    setStatus('processing');
    setProgress(0);

    try {
      // Parallel processing simulation for all files
      const totalFiles = files.length || 1;
      let completedCount = 0;

      const processBatch = files.map(async (file, index) => {
        // Simulate individual file processing time
        const duration = 2000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, duration));
        completedCount++;
        setProgress((completedCount / totalFiles) * 100);
        return { name: file.name, size: file.size };
      });

      if (toolId === 'text-to-speech') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProgress(100);
      } else {
        await Promise.all(processBatch);
      }

      if (user) {
        try {
          await fetch(`/api/tools/usage-check`, {
            method: 'POST'
          });
          await refreshUser(); 
        } catch (e) {
          console.warn("Usage tracking failed...");
        }
      }
      
      // Generate result bundle
      const pdfDoc = await PDFDocument.create();
      pdfDoc.addPage([600, 400]).drawText(`FileOra Batch - ${totalFiles} Files Processed`, { x: 50, y: 300 });
      const bytes = await pdfDoc.save();
      const finalBlob = new Blob([bytes as any], { type: 'application/pdf' });
      
      const url = URL.createObjectURL(finalBlob);
      setResultUrl(url);
      
      const uniqueId = Math.random().toString(36).substring(2, 10);
      setShareLink(`fileora.app/f/${uniqueId}`);

      setStatus('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });

      // Add entire batch to history
      files.forEach(file => {
        addToHistory({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          type: toolName,
          size: file.size,
          outputs: selectedOutputs
        });
      });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const outputOptions = [
    { id: 'pdf', label: 'PDF Document' },
    { id: 'docx', label: 'Word (DOCX)' },
    { id: 'jpg', label: 'Images (JPG)' },
    { id: 'txt', label: 'Plain Text' },
  ];

  const toggleOutput = (id: string) => {
    setSelectedOutputs(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) : [...prev, id]
    );
  };

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-[#0A192F] min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 dark:bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />


      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 20, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="fixed top-24 left-1/2 z-[100] bg-white border border-green-100 px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-none"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-bold text-gray-900">File processed successfully! ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 pt-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-primary mb-2 transition-colors font-medium">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Dashboard
            </button>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{toolName}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl border flex items-center shadow-sm bg-white border-gray-100 text-gray-600">
              <Rocket className="w-5 h-5 mr-2 text-primary animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest">
                FileOra Intelligent Engine
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden h-full flex flex-col">
              {status === 'idle' ? (
                <>
                  {toolId === 'text-to-speech' ? (
                    <div className="space-y-6">
                      <textarea 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter text..."
                        className="w-full h-64 p-8 rounded-3xl border-2 border-gray-100 focus:border-primary/30 outline-none transition-all text-xl"
                      />
                      <button onClick={() => processFiles()} className="btn-primary w-full py-6 text-xl">Generate Audio</button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <div 
                        className="flex-1 border-3 border-dashed border-primary/10 rounded-[2.5rem] p-12 text-center bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group flex flex-col items-center justify-center"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input id="file-upload" type="file" multiple className="hidden" onChange={(e) => addFiles(Array.from(e.target.files || []))} />
                        <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                          <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-gray-900">Drop your {toolName.split(' ')[0]}s here</h3>
                        <p className="text-gray-500 font-medium tracking-tight uppercase text-xs">Maximum 10 files • Auto-Detection Active</p>
                        
                        <div className="flex items-center space-x-4 mt-8">
                          <button className="flex items-center px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 hover:border-blue-500/30 transition-all shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" className="w-4 h-4 mr-2" /> Google Drive
                          </button>
                          <button className="flex items-center px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 hover:border-blue-600/30 transition-all shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg" className="w-4 h-4 mr-2" /> Dropbox
                          </button>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-8 space-y-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {files.map((file, i) => (
                              <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                {file.type.startsWith('image/') ? (
                                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                    <File className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-[10px] font-black uppercase text-gray-500 text-center truncate w-full">{file.name}</span>
                                  </div>
                                )}
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, idx) => idx !== i)); }}
                                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <SmartSuggestions file={files[0]} onSelect={handleSmartAction} />

                          {/* AI Summary Section */}
                          <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-xl font-black flex items-center">
                                <Bot className="w-6 h-6 mr-3 text-primary" /> AI File Insight
                              </h4>
                              {isAnalyzing && (
                                <span className="flex items-center text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                                  <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Deep Scanning...
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              {!aiSummary && isAnalyzing ? (
                                [1, 2, 3].map(i => (
                                  <div key={i} className="h-16 bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
                                ))
                              ) : aiSummary ? (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-3"
                                >
                                  {aiSummary.map((point, i) => (
                                    <div key={i} className="flex items-start p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                      <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-4 shrink-0" />
                                      <p className="text-sm font-medium text-gray-700 leading-relaxed">{point}</p>
                                    </div>
                                  ))}
                                  <button 
                                    onClick={() => setShowChat(true)}
                                    className="w-full mt-2 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                                  >
                                    Ask AI anything about this file
                                  </button>
                                </motion.div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : status === 'processing' ? (
                <div className="text-center py-20 flex-1 flex flex-col items-center justify-center">
                  <div className="relative">
                    <Loader2 className="w-24 h-24 text-primary animate-spin mb-8" />
                    <Sparkles className="absolute top-0 right-0 w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900">Intelligent Processing...</h3>
                  <p className="text-gray-500 text-lg">Optimizing for multiple output formats in parallel.</p>
                  
                  <div className="w-64 h-2 bg-gray-100 rounded-full mt-8 overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                  <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner border border-green-100">
                    <CheckCircle2 className="w-14 h-14 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-2">Ready for Download</h3>
                  <p className="text-gray-500 mb-8">Generated {selectedOutputs.length} format{selectedOutputs.length > 1 ? 's' : ''} for your convenience.</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <a href={resultUrl!} download={`${toolName}_Result.zip`} className="btn-primary inline-flex items-center px-10 py-5 text-xl shadow-2xl shadow-primary/30">
                      <Download className="w-6 h-6 mr-3" /> Download Bundle (ZIP)
                    </a>
                    <button 
                      onClick={() => setShowChat(true)}
                      className="inline-flex items-center px-10 py-5 text-xl bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl"
                    >
                      <MessageSquare className="w-6 h-6 mr-3" /> Chat with File
                    </button>
                  </div>

                  {/* Share Link UI */}
                  <div className="max-w-md w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600 font-bold text-sm">
                        <Share2 className="w-4 h-4 mr-2" /> Shareable Link
                      </div>
                      <span className="text-[10px] bg-primary/10 text-primary font-black px-2 py-1 rounded uppercase">Expires in 24h</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 truncate">
                        {shareLink}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(shareLink!)}
                        className="bg-white border border-gray-200 p-3 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-left">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Size Reduction</p>
                      <p className="text-2xl font-black text-gray-900">45% saved ⚡</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-left">
                      <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Time Saved</p>
                      <p className="text-2xl font-black text-gray-900">~2.4 mins</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Multi-Output Selection */}
            <div className="glass-card bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl">
              <h4 className="text-xl font-black mb-6 flex items-center"><Settings2 className="w-5 h-5 mr-3 text-primary" /> Output Formats</h4>
              <div className="grid grid-cols-1 gap-2">
                {outputOptions.map((opt) => (
                  <button 
                    key={opt.id}
                    onClick={() => toggleOutput(opt.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedOutputs.includes(opt.id) 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'bg-gray-50 border-gray-100 text-gray-400 grayscale hover:grayscale-0'
                    }`}
                  >
                    <span className="font-bold text-sm">{opt.label}</span>
                    {selectedOutputs.includes(opt.id) && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Multi-output processing enabled</p>
            </div>

            {/* Fix My File Button */}
            {files.length > 0 && status === 'idle' && (
              <button 
                onClick={() => processFiles(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-primary text-white py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center group hover:scale-[1.02] transition-all"
              >
                <Wand2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" /> Fix My File
              </button>
            )}
            
            <div className="glass-card bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl">
              <h4 className="text-xl font-black mb-6 flex items-center"><Layers className="w-5 h-5 mr-3 text-primary" /> Active Queue</h4>
              <div className="space-y-3">
                {files.length > 0 ? files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center min-w-0 pr-4">
                      <File className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <div className="truncate text-sm font-bold text-gray-800">{file.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"><X className="w-5 h-5" /></button>
                  </div>
                )) : <div className="text-center py-8 text-gray-300 italic text-sm">No files uploaded yet</div>}
              </div>
              {files.length > 0 && status === 'idle' && (
                <button onClick={() => processFiles()} className="btn-primary w-full mt-8 py-5 shadow-lg flex items-center justify-center font-black text-lg">
                  Process All <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showChat && (
          <AIChat 
            onClose={() => setShowChat(false)} 
            fileName={files[0]?.name}
            initialSummary={aiSummary || undefined}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ToolWorkspace;
