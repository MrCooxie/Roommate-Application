import { useState, useEffect } from 'react';
import Roommates from '../components/Roommates';
import Apartments from '../components/Apartments';
import HomeHeader from '../components/HomeHeader';

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

    // Fetch Roommates on initial mount
    useEffect(() => {
        handleTabChange('Roommates');
    }, []);

    const handleTabChange = async (tab: 'Roommates' | 'Apartments') => {
        setActiveTab(tab);
        try {
            const response = await fetch(`http://localhost:5001/api/${tab.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${tab}`);
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
        <>
            <HomeHeader onTabChange={handleTabChange} activeTab={activeTab} />
            {/* Content */}
            {activeTab === 'Roommates' ? <Roommates data={data} /> : <Apartments data={data} />}
        </>
    );
}