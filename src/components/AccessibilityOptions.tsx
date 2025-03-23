
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Volume2, FileAudio, Type, ImageUp } from 'lucide-react';

export type AccessibilityFormat = 'speech' | 'audio' | 'braille' | 'braille-image';

interface AccessibilityOptionsProps {
  selectedFormat: AccessibilityFormat;
  onChange: (format: AccessibilityFormat) => void;
}

const AccessibilityOptions: React.FC<AccessibilityOptionsProps> = ({
  selectedFormat,
  onChange,
}) => {
  return (
    <motion.div 
      className="w-full rounded-xl border shadow-subtle bg-background overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="p-4 border-b bg-secondary/30">
        <h2 className="text-lg font-semibold">Accessibility Options</h2>
        <p className="text-sm text-muted-foreground">Choose output format</p>
      </div>
      
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant={selectedFormat === 'speech' ? 'default' : 'outline'} 
          className="flex flex-col items-center justify-center h-24 gap-2"
          onClick={() => onChange('speech')}
        >
          <Volume2 className="h-6 w-6" />
          <span>Speech</span>
        </Button>
        
        <Button 
          variant={selectedFormat === 'audio' ? 'default' : 'outline'} 
          className="flex flex-col items-center justify-center h-24 gap-2"
          onClick={() => onChange('audio')}
        >
          <FileAudio className="h-6 w-6" />
          <span>Audio File</span>
        </Button>
        
        <Button 
          variant={selectedFormat === 'braille' ? 'default' : 'outline'} 
          className="flex flex-col items-center justify-center h-24 gap-2"
          onClick={() => onChange('braille')}
        >
          <Type className="h-6 w-6" />
          <span>Braille</span>
        </Button>
        
        <Button 
          variant={selectedFormat === 'braille-image' ? 'default' : 'outline'} 
          className="flex flex-col items-center justify-center h-24 gap-2"
          onClick={() => onChange('braille-image')}
        >
          <ImageUp className="h-6 w-6" />
          <span>Image to Braille</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default AccessibilityOptions;
