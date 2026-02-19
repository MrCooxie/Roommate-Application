interface HomeHeaderProps {
    onTabChange: (tab: 'Roommates' | 'Apartments') => void;
    activeTab: string;
}

export default function HomeHeader({ onTabChange, activeTab }: HomeHeaderProps) {
    return (
        <header className="flex flex-col items-center justify-center px-8 py-6 border-b border-gray-200 bg-white gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
                Finding Roommates
            </h1>
            <div className="flex gap-3">
                <button
                    id="tab-roommates"
                    className={`px-5 py-2 rounded-lg border-2 border-gray-900 font-semibold cursor-pointer transition-colors ${activeTab === 'Roommates' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                    onClick={() => onTabChange('Roommates')}
                >
                    Roommates
                </button>
                <button
                    id="tab-apartments"
                    className={`px-5 py-2 rounded-lg border-2 border-gray-900 font-semibold cursor-pointer transition-colors ${activeTab === 'Apartments' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                    onClick={() => onTabChange('Apartments')}
                >
                    Apartments
                </button>
            </div>
        </header>
    );
}