
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { type AccessibilityFormat } from './AccessibilityOptions';
import BrailleConverter from './BrailleConverter';
import BrailleImageConverter from './BrailleImageConverter';

export interface OutputSectionProps {
  originalText: string;
  isLoading: boolean;
  outputFormat: AccessibilityFormat;
}

const OutputSection: React.FC<OutputSectionProps> = ({
  originalText,
  isLoading,
  outputFormat,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Reset copy state when text changes
  useEffect(() => {
    setCopied(false);
    
    // Clean up any created audio URL when component unmounts or text changes
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [originalText]);
  
  // Generate audio file when output format is 'audio' and there's text
  useEffect(() => {
    if (outputFormat === 'audio' && originalText && !isLoading) {
      generateAudioFile();
    }
  }, [outputFormat, originalText, isLoading]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(originalText);
    setCopied(true);
    toast("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([originalText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `accessibility_text_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast("Text downloaded as file");
  };
  
  const generateAudioFile = () => {
    if ('speechSynthesis' in window) {
      // Create a SpeechSynthesisUtterance instance
      const utterance = new SpeechSynthesisUtterance(originalText);
      utterance.lang = 'en-US';
      
      // Create audio context and nodes for recording
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(destination.stream);
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        toast.success("Audio file generated successfully");
      };
      
      // Start recording
      mediaRecorder.start();
      
      // Use Web Speech API to generate speech
      window.speechSynthesis.speak(utterance);
      
      // When speech ends, stop recording
      utterance.onend = () => {
        mediaRecorder.stop();
      };
    } else {
      toast.error("Speech synthesis not supported in your browser");
    }
  };
  
  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(originalText);
        utterance.lang = 'en-US'; // Default to English
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      toast.error("Speech synthesis is not supported in your browser");
    }
  };
  
  const handleDownloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `speech_audio_${new Date().toISOString().slice(0,10)}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Audio file downloaded");
    } else {
      toast.error("Audio file not yet generated");
    }
  };
  
  return (
    <motion.div 
      className="w-full rounded-xl border shadow-subtle bg-background overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="p-4 border-b bg-secondary/30">
        <h2 className="text-lg font-semibold">Output</h2>
        <p className="text-sm text-muted-foreground">
          {isLoading 
            ? 'Processing your text...' 
            : originalText 
              ? 'Your content in selected format' 
              : 'Your content will appear here'}
        </p>
      </div>
      
      <div className="p-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading" 
              className="min-h-[200px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                </div>
                <p className="text-sm text-muted-foreground">Processing...</p>
              </div>
            </motion.div>
          ) : originalText ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="min-h-[200px] rounded-md bg-accent/30 p-4 mb-4 overflow-auto">
                <p className="whitespace-pre-wrap break-words">{originalText}</p>
              </div>
              
              {outputFormat === 'braille' && (
                <BrailleConverter text={originalText} />
              )}
              
              {outputFormat === 'braille-image' && (
                <BrailleImageConverter />
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="empty" 
              className="min-h-[200px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-muted-foreground">Enter text to see results</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {originalText && !isLoading && (
        <div className="p-4 border-t flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Download Text
          </Button>
          
          {outputFormat === 'speech' && (
            <Button 
              variant={isPlaying ? "default" : "outline"} 
              size="sm" 
              className="gap-1 ml-auto"
              onClick={handleSpeech}
            >
              <Volume2 className="h-4 w-4" />
              {isPlaying ? 'Stop' : 'Speak'}
            </Button>
          )}
          
          {outputFormat === 'audio' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 ml-auto"
              onClick={handleDownloadAudio}
              disabled={!audioUrl}
            >
              <Download className="h-4 w-4" />
              Download Audio
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default OutputSection;
