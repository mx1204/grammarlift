'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppButton from './AppButton';

interface SpeechToTextProps {
  onTranscriptChange: (text: string) => void;
  onStop: (finalText: string) => void;
  isProcessing: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange, onStop, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');
  const fullTranscriptRef = useRef<string>('');
  const isRecordingRef = useRef<boolean>(false);
  const wasStoppedManuallyRef = useRef<boolean>(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    const initRecognition = () => {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentFullTranscript = (transcriptRef.current + ' ' + finalTranscript + ' ' + interimTranscript).trim();
        fullTranscriptRef.current = currentFullTranscript;
        onTranscriptChange(currentFullTranscript);
        
        if (finalTranscript) {
          transcriptRef.current = (transcriptRef.current + ' ' + finalTranscript).trim();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'no-speech') {
          // This happens if nothing is heard; we'll let onend handle the restart
          return;
        }
        
        if (event.error === 'not-allowed') {
          setError("Microphone access denied. Please enable microphone permissions.");
          setIsRecording(false);
          isRecordingRef.current = false;
        } else {
          // Other errors might require a stop
          console.warn("Recoverable or transient error:", event.error);
        }
      };

      recognition.onend = () => {
        console.log("Speech Recognition Session Ended. Manual Stop:", wasStoppedManuallyRef.current);
        // Automatically restart if it wasn't a manual stop and we're supposed to be recording
        if (!wasStoppedManuallyRef.current && isRecordingRef.current) {
          console.log("Restarting Speech Recognition...");
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error("Could not restart immediately, re-initializing...", err);
            // If it fails to restart, the ref might be stale, but we should be careful about infinite loops
          }
        }
      };

      recognitionRef.current = recognition;
    };

    initRecognition();

    return () => {
      if (recognitionRef.current) {
        wasStoppedManuallyRef.current = true;
        recognitionRef.current.stop();
      }
    };
  }, [onTranscriptChange]);

  const toggleRecording = () => {
    if (isRecording) {
      // STOPPING
      wasStoppedManuallyRef.current = true;
      isRecordingRef.current = false;
      setIsRecording(false);
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Delay slightly to ensure onStop gets the VERY last bit of data
      setTimeout(() => {
        onStop(fullTranscriptRef.current);
      }, 300);
    } else {
      // STARTING
      setError(null);
      transcriptRef.current = '';
      fullTranscriptRef.current = '';
      onTranscriptChange('');
      
      wasStoppedManuallyRef.current = false;
      isRecordingRef.current = true;
      setIsRecording(true);
      
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <AppButton 
          onClick={toggleRecording} 
          variant={isRecording ? 'outline' : 'primary'}
          disabled={!!error || isProcessing}
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.5rem',
            border: isRecording ? '2px solid var(--primary)' : 'none',
            boxShadow: isRecording ? '0 0 20px var(--primary)' : 'none'
          }}
        >
          {isRecording ? '⏹️' : '🎤'}
        </AppButton>
        {isRecording && (
          <div className="pulse" style={{ 
            position: 'absolute', 
            top: -5, 
            left: -5, 
            right: -5, 
            bottom: -5, 
            borderRadius: '50%', 
            border: '2px solid var(--primary)',
            opacity: 0.5,
            zIndex: -1
          }} />
        )}
      </div>

      {isRecording && (
        <div style={{ 
          fontSize: '0.9rem', 
          color: 'var(--primary)', 
          fontWeight: 600,
          animation: 'pulse 2s infinite'
        }}>
          Listening... (Click to Finish)
        </div>
      )}

      {error && (
        <div style={{ color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
