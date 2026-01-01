import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    const utteranceRef = useRef(null);

    useEffect(() => {
        if (!synth) return;

        const updateVoices = () => {
            setVoices(synth.getVoices());
        };

        updateVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = updateVoices;
        }
    }, [synth]);

    const stop = useCallback(() => {
        if (!synth) return;
        synth.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    }, [synth]);

    const speak = useCallback((text, options = {}) => {
        if (!synth) return;

        // Split text into chunks to avoid browser limitations with long text
        // The Web Speech API often cuts off after a certain number of characters
        const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];

        stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // Apply options
        if (options.voice) utterance.voice = options.voice;
        if (options.rate) utterance.rate = options.rate;
        if (options.pitch) utterance.pitch = options.pitch;
        if (options.volume) utterance.volume = options.volume;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        utterance.onerror = (event) => {
            console.error('SpeechSynthesisUtterance error', event);
            setIsSpeaking(false);
            setIsPaused(false);
        };

        synth.speak(utterance);
    }, [synth, stop]);

    const pause = useCallback(() => {
        if (!synth) return;
        synth.pause();
        setIsPaused(true);
    }, [synth]);

    const resume = useCallback(() => {
        if (!synth) return;
        synth.resume();
        setIsPaused(false);
    }, [synth]);

    useEffect(() => {
        return () => {
            if (synth) {
                synth.cancel();
            }
        };
    }, [synth]);

    return {
        speak,
        pause,
        resume,
        stop,
        isSpeaking,
        isPaused,
        voices,
        supported: !!synth
    };
};
