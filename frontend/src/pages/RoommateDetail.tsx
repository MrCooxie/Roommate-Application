import { useLocation, useNavigate } from 'react-router-dom';

interface RoommateFields {
    Name?: string;
    Age?: string | number;
    City?: string;
    School?: string;
    Interests?: string | string[];
    Match?: string | number;
    'profile picture'?: { url: string }[];
    [key: string]: any;
}

// Map interest labels to simple SVG icons
const interestIcons: Record<string, ReturnType<typeof Object.values>[number]> = {
    Dance: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5" />
            <path d="M9 20l1-5 2 2 2-5" />
            <path d="M7 14l2-4 3 2 2-4" />
        </svg>
    ),
    Outgoing: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12a4 4 0 008 0" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
    ),
    Photography: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    Partying: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
};

function getIcon(interest: string) {
    return interestIcons[interest] ?? (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

export default function RoommateDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const fields: RoommateFields = location.state?.fields ?? {};

    const name: string = fields['Name'] ?? 'Unknown';
    const age: string | number = fields['Age'] ?? '';
    const city: string = fields['City'] ?? '';
    const school: string = fields['School'] ?? '';
    const match: string | number = fields['Match'] ?? fields['match'] ?? '';

    // Interests can be a comma-separated string or an array
    const rawInterests = fields['Interests'] ?? fields['interests'] ?? [];
    const interests: string[] = Array.isArray(rawInterests)
        ? rawInterests
        : String(rawInterests).split(',').map((s) => s.trim()).filter(Boolean);

    const imageAttachment = fields['profile picture']?.[0] ?? null;
    const imageUrl: string | undefined =
        imageAttachment?.url ?? (typeof imageAttachment === 'string' ? imageAttachment : undefined);

    return (
        <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto relative">

            {/* Top bar */}
            <div className="flex items-center justify-center px-5 pt-8 pb-4 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-5 bg-transparent border-none cursor-pointer text-gray-900 text-xl font-light p-1"
                >
                    ‹
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-xl">👋</span>
                    <span className="text-xl font-bold text-gray-900">Meet {name.split(' ')[0]}</span>
                </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto pb-24 px-5">

                {/* Photo + match badge */}
                <div className="relative w-full aspect-[4/4] rounded-3xl overflow-hidden bg-gray-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    )}

                    {/* Match % badge */}
                    {match !== '' && (
                        <div className="absolute top-3 right-3 bg-[#8EC19D] text-white text-sm font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                            {match}%
                        </div>
                    )}
                </div>

                {/* Name & Age */}
                <div className="text-center mt-5">
                    <p className="text-2xl font-bold text-gray-900">{name}</p>
                    {age !== '' && <p className="text-base text-gray-500 mt-1">{age}</p>}
                </div>

                {/* Divider + School & City row */}
                {(school || city) && (
                    <>
                        <div className="h-px bg-gray-200 mt-5" />
                        <div className="flex justify-around py-4">
                            {school && (
                                <div className="flex flex-col items-center gap-1">
                                    <svg width="22" height="22" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422A12.083 12.083 0 0121 21H3a12.083 12.083 0 012.84-10.422L12 14z" />
                                    </svg>
                                    <span className="text-sm text-gray-800 font-medium text-center">{school}</span>
                                </div>
                            )}
                            {city && (
                                <div className="flex flex-col items-center gap-1">
                                    <svg width="22" height="22" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" strokeWidth="2.5" />
                                    </svg>
                                    <span className="text-sm text-gray-800 font-medium">{city}</span>
                                </div>
                            )}
                        </div>
                        <div className="h-px bg-gray-200" />
                    </>
                )}

                {/* About / Interests section */}
                {interests.length > 0 && (
                    <div className="mt-5">
                        <p className="text-sm font-semibold text-gray-900 mb-3">
                            About {name.split(' ')[0]} ✨
                        </p>
                        <div className="flex flex-col gap-2.5">
                            {interests.map((interest) => (
                                <div
                                    key={interest}
                                    className="flex items-center gap-3 border border-gray-200 rounded-full px-5 py-3 w-fit"
                                >
                                    <span className="text-gray-800">{getIcon(interest)}</span>
                                    <span className="text-sm font-medium text-gray-900">{interest}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Nav Bar */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-100 flex justify-around items-center py-3 z-50">
                <button className="bg-transparent border-none cursor-pointer p-1" onClick={() => navigate('/')}>
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M3 12l9-9 9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18V12" />
                    </svg>
                </button>
                <button className="bg-transparent border-none cursor-pointer p-1">
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                </button>
                <button className="bg-transparent border-none cursor-pointer p-1">
                    <svg width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </button>
            </nav>
        </div>
    );
}
