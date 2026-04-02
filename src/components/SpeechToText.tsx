'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppButton from './AppButton';

interface SpeechToTextProps {
  onTranscriptChange: (text: string) => void;
  onStop: (finalText: string) => void;
  isProcessing: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange, onStop, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');
  const fullTranscriptRef = useRef<string>('');
  const isRecordingRef = useRef<boolean>(false);
  const wasStoppedManuallyRef = useRef<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store callbacks in refs to avoid useEffect dependency issues
  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const onStopRef = useRef(onStop);
  useEffect(() => { onTranscriptChangeRef.current = onTranscriptChange; }, [onTranscriptChange]);
  useEffect(() => { onStopRef.current = onStop; }, [onStop]);

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
        onTranscriptChangeRef.current(currentFullTranscript);
        
        if (finalTranscript) {
          transcriptRef.current = (transcriptRef.current + ' ' + finalTranscript).trim();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'no-speech') {
          return;
        }
        
        if (event.error === 'not-allowed') {
          setError("Microphone access denied. Please enable microphone permissions.");
          setIsRecording(false);
          isRecordingRef.current = false;
          stopTimer();
        } else {
          console.warn("Recoverable or transient error:", event.error);
        }
      };

      recognition.onend = () => {
        console.log("Speech Recognition Session Ended. Manual Stop:", wasStoppedManuallyRef.current);
        if (!wasStoppedManuallyRef.current && isRecordingRef.current) {
          console.log("Restarting Speech Recognition...");
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error("Could not restart immediately, re-initializing...", err);
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
      stopTimer();
    };
  }, []); // No more callback dependency — refs handle it

  const startTimer = () => {
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleRecording = () => {
    if (isRecording) {
      // STOPPING
      wasStoppedManuallyRef.current = true;
      isRecordingRef.current = false;
      setIsRecording(false);
      stopTimer();
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      setTimeout(() => {
        onStopRef.current(fullTranscriptRef.current);
      }, 300);
    } else {
      // STARTING
      setError(null);
      transcriptRef.current = '';
      fullTranscriptRef.current = '';
      onTranscriptChangeRef.current('');
      
      wasStoppedManuallyRef.current = false;
      isRecordingRef.current = true;
      setIsRecording(true);
      startTimer();
      
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', margin: '2rem 0' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Animated Rings when recording */}
        {isRecording && (
          <>
            <div className="wave-ring" style={{ animationDelay: '0s' }} />
            <div className="wave-ring" style={{ animationDelay: '0.4s' }} />
            <div className="wave-ring" style={{ animationDelay: '0.8s' }} />
          </>
        )}
        
        <button 
          onClick={toggleRecording} 
          disabled={!!error || isProcessing}
          className={`mic-button ${isRecording ? 'recording' : ''}`}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isProcessing ? (
            <div className="loader-inner" />
          ) : isRecording ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
        </button>
      </div>

      {/* Recording timer */}
      {isRecording && (
        <div className="recording-timer">
          <span className="timer-dot" />
          <span>{formatTime(elapsed)}</span>
        </div>
      )}

      {isRecording && (
        <div className="visualizer">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      )}

      {!isRecording && !isProcessing && !error && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          Click the mic to start speaking
        </p>
      )}

      {error && (
        <div className="glass" style={{ color: 'var(--error)', fontSize: '0.85rem', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--error)' }}>
          {error}
        </div>
      )}

      <style jsx>{`
        .mic-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: var(--card-bg);
          color: var(--primary);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1), inset 0 0 0 1px var(--card-border);
          position: relative;
          z-index: 2;
        }

        .mic-button:hover:not(:disabled) {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15), inset 0 0 0 1px var(--primary);
        }

        .mic-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .mic-button.recording {
          background: var(--primary);
          color: white;
          box-shadow: 0 0 30px var(--primary);
        }

        .mic-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .wave-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid var(--primary);
          animation: ring-pulse 1.8s infinite ease-out;
          opacity: 0;
          z-index: 1;
        }

        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .recording-timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--error);
          font-variant-numeric: tabular-nums;
        }

        .timer-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--error);
          animation: timer-blink 1s infinite;
        }

        @keyframes timer-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .visualizer {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 24px;
        }

        .bar {
          width: 3px;
          height: 8px;
          background: var(--primary);
          border-radius: 2px;
          animation: bar-dance 1s infinite ease-in-out;
        }

        @keyframes bar-dance {
          0%, 100% { height: 8px; opacity: 0.6; }
          50% { height: 24px; opacity: 1; }
        }

        .loader-inner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpeechToText;
