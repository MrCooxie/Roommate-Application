import { useState, useEffect } from 'react';
import Roommates from '../components/Roommates';
import Apartments from '../components/Apartments';

export interface AirtableRecord {
    id: string;
    fields: Record<string, any>;
    createdTime: string;
}

export default function Home() {
    const [data, setData] = useState<AirtableRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'Roommates' | 'Apartments'>('Roommates');

    useEffect(() => {
        handleTabChange('Roommates');
    }, []);

    const handleTabChange = async (tab: 'Roommates' | 'Apartments') => {
        setActiveTab(tab);
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/${tab.toLowerCase()}`);
            if (!response.ok) throw new Error(`Failed to fetch ${tab}`);
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto relative">

            {/* Header */}
            <div className="pt-7 px-5">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-5">
                    Find apartments
                </h1>

                {/* Pill Tabs */}
                <div className="flex gap-2.5">
                    {(['Roommates', 'Apartments'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`flex-1 py-3 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer
                                ${activeTab === tab
                                    ? 'bg-[#8EC19D] text-white border-[#8EC19D]'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-20">
                {loading ? (
                    <div className="flex items-center justify-center min-h-48 text-gray-400">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 p-8">{error}</div>
                ) : activeTab === 'Roommates' ? (
                    <Roommates data={data} />
                ) : (
                    <Apartments data={data} />
                )}
            </div>

            {/* Bottom Nav Bar */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-100 flex justify-around items-center py-3 z-50">
                {/* Home */}
                <button className="bg-transparent border-none cursor-pointer flex flex-col items-center p-1">
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M3 12l9-9 9 9" />
                        <path d="M9 21V12h6v9" />
                        <path d="M3 12v9h18V12" />
                    </svg>
                </button>

                {/* Chat */}
                <button className="bg-transparent border-none cursor-pointer flex flex-col items-center p-1">
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                </button>

                {/* Settings */}
                <button className="bg-transparent border-none cursor-pointer flex flex-col items-center p-1">
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </button>
            </nav>
        </div>
    );
}