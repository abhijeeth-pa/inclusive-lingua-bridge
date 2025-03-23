
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Copy, Check, Image, RefreshCw, ImageUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { imageToBraille } from '@/utils/accessibility';

interface BrailleImageConverterProps {
  initialImageUrl?: string;
}

const BrailleImageConverter: React.FC<BrailleImageConverterProps> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [brailleImage, setBrailleImage] = useState<string[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (imageUrl) {
      convertImageToBraille(imageUrl);
    }
  }, [imageUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image is too large. Please upload an image smaller than 5MB.');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }
    
    // Create object URL for the uploaded file
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    
    // Clean up previous object URL if it exists
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check file size and type
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image is too large. Please upload an image smaller than 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const convertImageToBraille = async (url: string) => {
    setIsProcessing(true);
    
    try {
      // Get width based on current viewport
      const containerWidth = Math.min(window.innerWidth - 40, 800);
      const brailleWidth = Math.floor(containerWidth / 14); // Adjust for monospace font size
      
      const brailleData = await imageToBraille(url, brailleWidth);
      setBrailleImage(brailleData);
    } catch (error) {
      console.error('Error converting image to braille:', error);
      toast.error('Failed to convert image to braille representation');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCopy = () => {
    // Convert 2D array to text with line breaks
    const brailleText = brailleImage.map(row => row.join('')).join('\n');
    
    navigator.clipboard.writeText(brailleText);
    setCopied(true);
    toast.success('Braille image copied to clipboard');
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="w-full rounded-lg border p-4 bg-background shadow-subtle mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Image to Braille Converter</h3>
        
        <div className="flex items-center gap-2">
          <Input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleUploadClick}
            className="h-8 px-2 text-xs gap-1"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload Image
          </Button>
          
          {brailleImage.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 text-xs"
              disabled={isProcessing}
            >
              {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          )}
        </div>
      </div>
      
      {isProcessing ? (
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin text-primary/70" />
          <span className="ml-2 text-sm">Converting image to braille...</span>
        </div>
      ) : brailleImage.length > 0 ? (
        <div className="bg-accent/30 p-3 rounded-md overflow-x-auto">
          <pre className="font-mono text-xs leading-tight whitespace-pre">
            {brailleImage.map((row, i) => (
              <div key={i}>{row.join('')}</div>
            ))}
          </pre>
        </div>
      ) : imageUrl ? (
        <div className="flex items-center justify-center p-4 bg-accent/30 rounded-md">
          <div className="relative max-w-[300px] max-h-[200px] overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Original image" 
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center p-8 bg-accent/10 rounded-md border border-dashed"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <ImageUp className="h-10 w-10 text-muted-foreground/60 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Drop an image here or click upload to convert it to braille
          </p>
        </div>
      )}
      
      <p className="mt-3 text-xs text-muted-foreground">
        This feature converts images to braille patterns using contrast detection. The result may vary depending on image complexity.
      </p>
    </motion.div>
  );
};

export default BrailleImageConverter;
