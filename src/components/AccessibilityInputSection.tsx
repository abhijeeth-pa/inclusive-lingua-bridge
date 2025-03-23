
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle, Upload, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AccessibilityInputSectionProps {
  onProcessText: (text: string) => void;
  isLoading: boolean;
}

const AccessibilityInputSection: React.FC<AccessibilityInputSectionProps> = ({
  onProcessText,
  isLoading
}) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimeout, setRecordingTimeout] = useState<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Please enter some text to process');
      return;
    }
    onProcessText(text);
  };

  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }
    
    // @ts-ignore - Necessary for browser compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setText(transcript);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      toast.error(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
      recognitionRef.current?.abort();
    };
    
    recognitionRef.current.start();
    setIsRecording(true);
    
    // Auto-stop after 60 seconds for better UX
    const timeout = setTimeout(() => {
      handleStopRecording();
      toast.info('Recording stopped after 60 seconds');
    }, 60000);
    
    setRecordingTimeout(timeout);
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      
      if (recordingTimeout) {
        clearTimeout(recordingTimeout);
        setRecordingTimeout(null);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if it's a text file
    if (file.type !== 'text/plain') {
      toast.error('Please upload a text file (.txt)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      setText(fileContent);
      toast.success('File uploaded successfully');
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    
    reader.readAsText(file);
  };

  return (
    <motion.div 
      className="w-full rounded-xl border shadow-subtle bg-background overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 border-b bg-secondary/30">
        <h2 className="text-lg font-semibold">Input</h2>
        <p className="text-sm text-muted-foreground">
          Enter text, record voice, or upload a file
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <Textarea 
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="min-h-[200px] bg-accent/10 focus:bg-accent/20 resize-y"
            disabled={isLoading}
          />
          
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              type="submit" 
              disabled={isLoading || !text.trim()}
              className="gap-1"
            >
              <ArrowUp className="h-4 w-4" />
              Process Text
            </Button>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt"
              className="hidden"
            />
            
            <Button 
              type="button"
              variant="outline" 
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
              className="gap-1"
            >
              <Upload className="h-4 w-4" />
              Upload Text
            </Button>
            
            {!isRecording ? (
              <Button 
                type="button"
                variant="outline"
                onClick={handleStartRecording}
                disabled={isLoading}
                className="gap-1 ml-auto"
              >
                <Mic className="h-4 w-4" />
                Record Voice
              </Button>
            ) : (
              <Button 
                type="button"
                variant="default"
                onClick={handleStopRecording}
                className="gap-1 ml-auto animate-pulse"
              >
                <StopCircle className="h-4 w-4" />
                Stop Recording
              </Button>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AccessibilityInputSection;
