import { useState } from 'react';

interface AirtableRecord {
    id: string;
    fields: Record<string, any>;
    createdTime: string;
}

export default function Home() {
    const [data, setData] = useState<AirtableRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'none' | 'users' | 'housing'>('none');

    const fetchData = async (type: 'users' | 'housing') => {
        setLoading(true);
        setError(null);
        setActiveTab(type);
        try {
            const response = await fetch(`http://localhost:5000/api/${type}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}`);
            }
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
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl md:text-6xl">
                        Roommate Finder
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Find your perfect living match or search for available housing in your area.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <button
                            onClick={() => fetchData('users')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 ${activeTab === 'users'
                                    ? 'bg-indigo-600 text-white shadow-indigo-200'
                                    : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
                                }`}
                        >
                            Find Users
                        </button>
                        <button
                            onClick={() => fetchData('housing')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 ${activeTab === 'housing'
                                    ? 'bg-indigo-600 text-white shadow-indigo-200'
                                    : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
                                }`}
                        >
                            Search Housing
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-gray-500 font-medium">Fetching details...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((record) => (
                            <div
                                key={record.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${activeTab === 'users' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {activeTab === 'users' ? 'Roommate' : 'Property'}
                                        </span>
                                    </div>

                                    {/* Dynamically render fields */}
                                    {Object.entries(record.fields).map(([key, value]) => {
                                        // Skip fields like password or internal IDs if they exist
                                        if (key.toLowerCase().includes('password')) return null;

                                        return (
                                            <div key={key} className="mb-3">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    {key}
                                                </label>
                                                <div className="text-gray-800 font-medium overflow-hidden text-ellipsis">
                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && data.length === 0 && activeTab !== 'none' && (
                    <div className="text-center py-20 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No records found for this category.</p>
                    </div>
                )}

                {activeTab === 'none' && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center p-6 bg-indigo-50 rounded-full mb-6">
                            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Ready to explore?</h3>
                        <p className="text-gray-500">Pick a category above to see current listings.</p>
                    </div>
                )}
            </div>
        </div>
    );
}