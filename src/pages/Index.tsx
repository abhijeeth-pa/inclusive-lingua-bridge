
import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow px-4 py-8 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.section 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <Accessibility className="w-4 h-4 mr-2" />
              Breaking barriers through technology
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Universal AI
              <span className="block text-primary"> Accessibility Tool</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Convert text into multiple accessible formats including Braille, speech, and audio files.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#accessibility">
                <Button size="lg" className="gap-2">
                  <Accessibility className="w-5 h-5" />
                  Start Converting
                </Button>
              </a>
              
              <a href="#about">
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.section>
          
          <motion.section 
            id="accessibility"
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AccessibilityPanel />
          </motion.section>
          
          <motion.section 
            id="about"
            className="mb-16 rounded-xl border shadow-subtle overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-6 md:p-8 bg-accent/30">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About this Project</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Universal AI Accessibility Tool is designed to break down communication barriers for people with visual and hearing impairments. By leveraging AI technology, we provide seamless conversion between different accessible formats including speech, audio files, and Braille.
              </p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Speech Synthesis</h3>
                <p className="text-sm text-muted-foreground">
                  Convert text to natural-sounding speech with customizable voices and speaking rates, making content accessible to users with visual impairments or reading difficulties.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Braille Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Translate text to Braille patterns using Unicode Braille encoding, providing digital Braille representation for visually impaired users.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Image to Braille</h3>
                <p className="text-sm text-muted-foreground">
                  Convert images to Braille patterns using contrast detection, enabling visually impaired users to experience visual content through tactile representation.
                </p>
              </div>
            </div>
          </motion.section>
          
          <motion.section 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to break accessibility barriers?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start using the Universal AI Accessibility Tool today and experience seamless communication across different abilities.
            </p>
            
            <a href="#accessibility">
              <Button size="lg" className="gap-2">
                <Accessibility className="w-5 h-5" />
                Try it Now
              </Button>
            </a>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
