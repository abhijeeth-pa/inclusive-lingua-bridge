
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Upload, StopCircle, RefreshCw, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import LanguageSelector from './LanguageSelector';
import { toast } from '@/components/ui/use-toast';
import { detectLanguage } from '@/utils/translator';

interface InputSectionProps {
  onTranslate: (text: string, fromLang: string, toLang: string) => void;
  isProcessing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onTranslate, isProcessing }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isDetecting, setIsDetecting] = useState(false);
  
  // This would be replaced with actual recording functionality
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Success",
        description: "Recording stopped",
      });
      // Simulate getting text from speech
      setTimeout(() => {
        const demoText = "This is a sample transcription from recorded audio.";
        setInputText(demoText);
        
        // Auto-detect language after recording
        handleDetectLanguage(demoText);
      }, 1000);
    } else {
      setIsRecording(true);
      toast({
        title: "Recording",
        description: "Speak clearly into your microphone",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      toast({
        title: "Processing",
        description: `Processing audio file: ${file.name}`,
      });
      
      // In a real implementation, you would process the audio file here
      setTimeout(() => {
        const demoText = "This is a sample transcription from an audio file.";
        setInputText(demoText);
        
        // Auto-detect language after file upload
        handleDetectLanguage(demoText);
        
        toast({
          title: "Success",
          description: "Audio file processed",
        });
      }, 1500);
    }
  };

  const handleDetectLanguage = async (text: string = inputText) => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text first",
        variant: "destructive"
      });
      return;
    }
    
    setIsDetecting(true);
    try {
      const detectedLang = await detectLanguage(text);
      setSourceLanguage(detectedLang);
      toast({
        title: "Language Detected",
        description: `Detected language: ${detectedLang}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Language detection failed",
        variant: "destructive"
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter or record some text first",
        variant: "destructive"
      });
      return;
    }
    
    if (sourceLanguage === targetLanguage) {
      toast({
        title: "Error",
        description: "Source and target languages must be different",
        variant: "destructive"
      });
      return;
    }
    
    onTranslate(inputText, sourceLanguage, targetLanguage);
  };
  
  const handleClear = () => {
    setInputText('');
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
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
        <p className="text-sm text-muted-foreground">Enter text or record audio to translate</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
          <LanguageSelector 
            value={sourceLanguage} 
            onChange={setSourceLanguage} 
            label="Translate from"
          />
          
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-background border shadow-sm"
              onClick={handleSwapLanguages}
              disabled={isProcessing}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Swap languages</span>
            </Button>
          </div>
          
          <LanguageSelector 
            value={targetLanguage} 
            onChange={setTargetLanguage} 
            label="Translate to"
          />
        </div>
        
        <div className="mb-4">
          <Textarea
            placeholder="Type or paste text here..."
            className="min-h-[120px] resize-y"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          {inputText && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => handleDetectLanguage()}
              disabled={isDetecting || isProcessing || !inputText.trim()}
            >
              {isDetecting ? 'Detecting...' : 'Detect Language'}
            </Button>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button 
            onClick={handleToggleRecording}
            variant={isRecording ? "destructive" : "outline"} 
            className="gap-2"
            disabled={isProcessing}
          >
            {isRecording ? (
              <>
                <StopCircle className="h-4 w-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Record Audio
              </>
            )}
          </Button>
          
          <div className="relative">
            <input
              type="file"
              id="audio-upload"
              className="sr-only"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={isProcessing || isRecording}
            />
            <label
              htmlFor="audio-upload"
              className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground ${(isProcessing || isRecording) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Upload className="h-4 w-4" />
              Upload Audio
            </label>
          </div>
          
          {inputText && (
            <Button 
              variant="ghost" 
              onClick={handleClear}
              size="icon"
              className="ml-auto"
              disabled={isProcessing}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div className="p-4 bg-accent/20">
        <Button 
          className="w-full gap-2" 
          size="lg"
          onClick={handleTranslate}
          disabled={!inputText.trim() || isProcessing}
        >
          <Languages className="h-4 w-4" />
          {isProcessing ? 'Translating...' : 'Translate'}
        </Button>
      </div>
    </motion.div>
  );
};

export default InputSection;
