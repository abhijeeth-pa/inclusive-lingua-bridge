
import React, { useState } from 'react';
import AccessibilityOptions, { AccessibilityFormat } from './AccessibilityOptions';
import AccessibilityInputSection from './AccessibilityInputSection';
import OutputSection from './OutputSection';

const AccessibilityPanel: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [outputFormat, setOutputFormat] = useState<AccessibilityFormat>('speech');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleProcessText = (text: string) => {
    setIsLoading(true);
    // Process based on output format
    setTimeout(() => {
      setOriginalText(text);
      setIsLoading(false);
    }, 500);
  };
  
  const handleFormatChange = (format: AccessibilityFormat) => {
    setOutputFormat(format);
    // If changing to audio format with existing text, we'll need to process it
    if (format === 'audio' && originalText) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  
  return (
    <div className="space-y-6">
      <AccessibilityOptions 
        selectedFormat={outputFormat}
        onChange={handleFormatChange}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccessibilityInputSection 
          onProcessText={handleProcessText}
          isLoading={isLoading}
        />
        
        <OutputSection 
          originalText={originalText}
          isLoading={isLoading}
          outputFormat={outputFormat}
        />
      </div>
    </div>
  );
};

export default AccessibilityPanel;
