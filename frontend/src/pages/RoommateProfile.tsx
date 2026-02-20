import { useLocation, useNavigate } from 'react-router-dom';
import type { AirtableRecord } from './Home';

// Icon components
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);
const GradCapIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);
const BuildingIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M9 21V7l6-4v18M9 11h6" />
    </svg>
);


// Interest pill icon map
const interestIcons: Record<string, string> = {
    dance: '🕺',
    dancing: '🕺',
    outgoing: '🌐',
    photography: '📷',
    gaming: '🎮',
    fitness: '💪',
    reading: '📚',
    cooking: '🍳',
    music: '🎵',
    travel: '✈️',
    art: '🎨',
    sports: '⚽',
    hiking: '🥾',
    movies: '🎬',
    yoga: '🧘',
};

function getIcon(interest: string): string {
    const key = interest.toLowerCase().trim();
    return interestIcons[key] ?? '✨';
}

export default function RoommateProfile() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const record: AirtableRecord = state?.record;

    if (!record) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                <p>No profile data found. <button onClick={() => navigate(-1)} className="text-indigo-600 underline">Go back</button></p>
            </div>
        );
    }

    const f = record.fields;
    const name: string = f['Name'] ?? 'Unknown';
    const age: string | number = f['Age'] ?? '';
    const university: string = f['University'] ?? f['School'] ?? '';
    const city: string = f['City'] ?? f['Location'] ?? '';
    const match: number | null = f['Match'] ?? null;
    const imageAttachment = f['profile picture']?.[0] ?? null;
    const imageUrl: string | undefined =
        imageAttachment?.url ?? (typeof imageAttachment === 'string' ? imageAttachment : undefined);

    // Interests / hobbies — could be a comma-separated string or an array
    const rawInterests = f['Hobbies'] ?? f['Interests'] ?? f['hobbies'] ?? f['interests'] ?? '';
    const interests: string[] = Array.isArray(rawInterests)
        ? rawInterests
        : typeof rawInterests === 'string' && rawInterests.length > 0
            ? rawInterests.split(/[,;]/).map((s: string) => s.trim()).filter(Boolean)
            : [];

    const firstName = name.split(' ')[0];

    return (
        <div className="min-h-screen bg-white flex flex-col max-w-xl mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-center px-5 pt-6 pb-2 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-5 text-gray-700 hover:text-gray-900 transition-colors p-1"
                >
                    <BackIcon />
                </button>
                <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>👋</span> Meet {firstName}
                </h1>
            </div>

            {/* Profile photo */}
            <div className="px-6 mt-4">
                <div className="w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                    {imageUrl ? (
                        <img src={imageUrl} alt={name} className="w-full h-auto object-contain rounded-2xl" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                            <svg className="w-20 h-20 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Name & match */}
            <div className="text-center mt-5 px-6">
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                {match !== null && (
                    <p className="text-green-500 font-semibold mt-0.5">{match}% Match</p>
                )}
                {age !== '' && (
                    <p className="text-gray-800 font-semibold mt-1">{age}</p>
                )}
            </div>

            {/* Divider with university & city */}
            {(university || city) && (
                <div className="mx-6 mt-5 border-t border-b border-gray-200 py-4 flex justify-around">
                    {university && (
                        <div className="flex flex-col items-center gap-1 text-gray-700">
                            <GradCapIcon />
                            <span className="text-sm font-medium text-center">{university}</span>
                        </div>
                    )}
                    {city && (
                        <div className="flex flex-col items-center gap-1 text-gray-700">
                            <BuildingIcon />
                            <span className="text-sm font-medium text-center">{city}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Interests */}
            {interests.length > 0 && (
                <div className="mx-6 mt-5">
                    <h3 className="text-center text-base font-semibold text-gray-700 mb-3">
                        About {firstName} ✨
                    </h3>
                    <div className="flex flex-col gap-3">
                        {interests.map((interest) => (
                            <div
                                key={interest}
                                className="flex items-center gap-3 border border-gray-200 rounded-full px-5 py-3 w-fit mx-auto min-w-[180px]"
                            >
                                <span className="text-xl">{getIcon(interest)}</span>
                                <span className="text-gray-800 font-medium capitalize">{interest}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}
