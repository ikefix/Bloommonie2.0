// Speech Recognition and Text-to-Speech Utilities
// This file provides helper functions for voice interactions

import { useState, useCallback } from 'react';

export class SpeechManager {
  constructor() {
    this.recognition = null;
    this.synthesis = null;
    this.isSupported = this.checkSupport();
  }

  checkSupport() {
    return {
      recognition: typeof window !== 'undefined' && 'webkitSpeechRecognition' in window,
      synthesis: typeof window !== 'undefined' && 'speechSynthesis' in window
    };
  }

  initializeRecognition(options = {}) {
    if (!this.isSupported.recognition) {
      throw new Error('Speech recognition is not supported in this browser');
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new SpeechRecognition();

    // Default options
    const defaultOptions = {
      continuous: true,
      interimResults: true,
      lang: 'en-US',
      maxAlternatives: 1
    };

    const config = { ...defaultOptions, ...options };

    // Configure recognition
    Object.keys(config).forEach(key => {
      this.recognition[key] = config[key];
    });

    return this.recognition;
  }

  startRecognition(onResult, onError, onEnd) {
    if (!this.recognition) {
      this.initializeRecognition();
    }

    this.recognition.onresult = (event) => {
      const results = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        results.push({
          transcript: result[0].transcript,
          confidence: result[0].confidence,
          isFinal: result.isFinal
        });
      }
      onResult(results, event);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError(event);
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
      if (onEnd) onEnd();
    };

    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text, options = {}) {
    if (!this.isSupported.synthesis) {
      console.warn('Speech synthesis is not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Default options
    const defaultOptions = {
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      lang: 'en-US'
    };

    const config = { ...defaultOptions, ...options };

    // Configure utterance
    Object.keys(config).forEach(key => {
      utterance[key] = config[key];
    });

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Prefer English voices
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.localService
    ) || voices.find(voice => voice.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);

    return utterance;
  }

  getVoices() {
    if (!this.isSupported.synthesis) {
      return [];
    }
    return window.speechSynthesis.getVoices();
  }

  isSpeaking() {
    return this.isSupported.synthesis && window.speechSynthesis.speaking;
  }

  stopSpeaking() {
    if (this.isSupported.synthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Enhanced voice command processing
  processVoiceCommand(transcript, commands) {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    // Check for exact matches first
    for (const [intent, keywords] of Object.entries(commands)) {
      for (const keyword of keywords) {
        if (normalizedTranscript.includes(keyword.toLowerCase())) {
          return {
            intent,
            confidence: 1.0,
            matchedKeyword: keyword,
            transcript
          };
        }
      }
    }

    // Fuzzy matching for better recognition
    const fuzzyMatches = [];
    for (const [intent, keywords] of Object.entries(commands)) {
      for (const keyword of keywords) {
        const similarity = this.calculateSimilarity(normalizedTranscript, keyword.toLowerCase());
        if (similarity > 0.7) {
          fuzzyMatches.push({
            intent,
            confidence: similarity,
            matchedKeyword: keyword,
            transcript
          });
        }
      }
    }

    // Return the best match
    if (fuzzyMatches.length > 0) {
      return fuzzyMatches.sort((a, b) => b.confidence - a.confidence)[0];
    }

    return {
      intent: 'UNKNOWN',
      confidence: 0,
      matchedKeyword: null,
      transcript
    };
  }

  // Calculate string similarity (Levenshtein distance)
  calculateSimilarity(str1, str2) {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

    if (len1 === 0) return len2 === 0 ? 1 : 0;
    if (len2 === 0) return 0;

    // Initialize matrix
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    // Calculate distances
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,      // deletion
          matrix[i][j - 1] + 1,      // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return maxLen === 0 ? 1 : 1 - (distance / maxLen);
  }

  // Extract entities from speech (products, amounts, etc.)
  extractEntities(transcript) {
    const entities = {
      products: [],
      amounts: [],
      quantities: [],
      actions: []
    };

    // Product extraction (simplified)
    const productPatterns = [
      /\b(buy|get|purchase|order|need|want)\s+([a-z\s]+?)(?:\b(?:and|or|with|for)\b|$)/gi,
      /\b([a-z]+(?:\s+[a-z]+)*)\s+(?:product|item|goods)\b/gi
    ];

    productPatterns.forEach(pattern => {
      const matches = [...transcript.matchAll(pattern)];
      matches.forEach(match => {
        const product = match[2] || match[1];
        if (product && product.length > 2) {
          entities.products.push(product.trim());
        }
      });
    });

    // Amount extraction
    const amountPattern = /\b(?:₦|naira|dollar|\$)?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:naira|dollars?|k|kobo)?\b/gi;
    const amountMatches = [...transcript.matchAll(amountPattern)];
    amountMatches.forEach(match => {
      const amount = parseFloat(match[1].replace(/,/g, ''));
      if (!isNaN(amount)) {
        entities.amounts.push(amount);
      }
    });

    // Quantity extraction
    const quantityPattern = /\b(\d+)\s+(?:pieces?|pcs|units?|items?|cartons?|boxes?|bags?)\b/gi;
    const quantityMatches = [...transcript.matchAll(quantityPattern)];
    quantityMatches.forEach(match => {
      entities.quantities.push(parseInt(match[1]));
    });

    // Action extraction
    const actionWords = ['buy', 'sell', 'check', 'show', 'get', 'find', 'search', 'add', 'remove', 'update', 'delete'];
    actionWords.forEach(action => {
      if (transcript.toLowerCase().includes(action)) {
        entities.actions.push(action);
      }
    });

    return entities;
  }

  // Voice feedback for different scenarios
  provideFeedback(scenario, data = {}) {
    const feedbackMessages = {
      listening: "I'm listening. Please speak your command.",
      processing: "Processing your command...",
      success: "Command completed successfully.",
      error: "Sorry, I encountered an error. Please try again.",
      no_match: "I didn't understand that. Please try again.",
      confirm: `Are you sure you want to ${data.action}?`,
      product_found: `I found ${data.count} products matching your search.`,
      product_not_found: "I couldn't find any products matching your search.",
      balance: `Your current balance is ${data.amount}.`,
      transfer_initiated: "Transfer initiated successfully.",
      inventory_updated: "Inventory has been updated."
    };

    const message = feedbackMessages[scenario] || "Processing your request...";
    this.speak(message);
  }
}

// Create singleton instance
export const speechManager = new SpeechManager();

// React hook for speech functionality
export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const startListening = useCallback((onResult) => {
    if (!speechManager.isSupported.recognition) {
      setError('Speech recognition is not supported');
      return;
    }

    setIsListening(true);
    setError(null);

    speechManager.startRecognition(
      (results) => {
        const latestResult = results[results.length - 1];
        setTranscript(latestResult.transcript);
        
        if (latestResult.isFinal && onResult) {
          onResult(latestResult);
        }
      },
      (error) => {
        setError(error.error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  }, []);

  const stopListening = useCallback(() => {
    speechManager.stopRecognition();
    setIsListening(false);
  }, []);

  const speak = useCallback((text, options) => {
    return speechManager.speak(text, options);
  }, []);

  return {
    isListening,
    isProcessing,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
    isSupported: speechManager.isSupported
  };
};

export default speechManager;
