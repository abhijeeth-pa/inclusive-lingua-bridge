
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 mt-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground mb-1">
              Universal AI Accessibility Translator
            </p>
            <p className="text-xs text-muted-foreground">
              Breaking barriers through technology
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> for accessibility
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Universal Translator. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
