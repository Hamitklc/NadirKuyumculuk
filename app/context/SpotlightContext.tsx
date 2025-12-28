"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SpotlightContextType {
    isSpotlightActive: boolean;
    toggleSpotlight: () => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export function SpotlightProvider({ children }: { children: ReactNode }) {
    const [isSpotlightActive, setIsSpotlightActive] = useState(false);

    const toggleSpotlight = () => setIsSpotlightActive(!isSpotlightActive);

    return (
        <SpotlightContext.Provider value={{ isSpotlightActive, toggleSpotlight }}>
            {children}
        </SpotlightContext.Provider>
    );
}

export function useSpotlight() {
    const context = useContext(SpotlightContext);
    if (context === undefined) {
        throw new Error('useSpotlight must be used within a SpotlightProvider');
    }
    return context;
}
