
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Languages, Accessibility } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 md:px-8">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4 sm:mb-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Languages className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Universal Translator</h1>
            <p className="text-sm text-muted-foreground">AI-powered accessibility</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a 
            href="#speech" 
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <Mic className="w-4 h-4" />
            <span className="text-sm">Speech</span>
          </a>
          <a 
            href="#text" 
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm">Text</span>
          </a>
          <a 
            href="#accessibility" 
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <Accessibility className="w-4 h-4" />
            <span className="text-sm">Accessibility</span>
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
