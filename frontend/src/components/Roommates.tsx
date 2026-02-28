import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AirtableRecord } from "../pages/Home";

interface RoommatesProps {
    data: AirtableRecord[];
}

function HeartButton() {
    const [liked, setLiked] = useState(false);
    return (
        <button
            onClick={() => setLiked((v) => !v)}
            className="bg-transparent border-none cursor-pointer p-1"
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={liked ? '#ef4444' : 'none'}
                stroke={liked ? '#ef4444' : '#aaa'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        </button>
    );
}

export default function Roommates({ data }: RoommatesProps) {
    const navigate = useNavigate();
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-60 text-gray-300">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <p className="font-semibold text-gray-400">No roommates found</p>
                <p className="text-sm mt-1 text-gray-300">Try refreshing or check back later.</p>
            </div>
        );
    }

    return (
        <div className="px-5 pt-5">
            {data.map((record) => {
                const f = record.fields;

                const imageAttachment = f['profile picture']?.[0] ?? null;
                const imageUrl: string | undefined =
                    imageAttachment?.url ??
                    (typeof imageAttachment === 'string' ? imageAttachment : undefined);

                const name: string = f['Name'] ?? 'Unknown';
                const age: string | number = f['Age'] ?? '';
                const city: string = f['City'] ?? '';
                const school: string = f['School'] ?? '';

                return (
                    <div
                        key={record.id}
                        className="mb-7 cursor-pointer"
                        onClick={() => navigate(`/roommate/${record.id}`, { state: { fields: record.fields } })}
                    >
                        {/* Name & Age */}
                        <p className="text-xl font-bold text-gray-900 mb-3">
                            {name}{age !== '' ? `, ${age}` : ''}
                        </p>

                        {/* Image */}
                        <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    className="w-full h-full object-cover object-top"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Info + Heart */}
                        <div className="flex items-center justify-between mt-3">
                            <div>
                                {city && (
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <svg width="14" height="14" fill="none" stroke="#777" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">{city}</span>
                                    </div>
                                )}
                                {school && (
                                    <div className="flex items-center gap-1.5">
                                        <svg width="14" height="14" fill="none" stroke="#777" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 21H3a12.083 12.083 0 012.84-10.422L12 14z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">{school}</span>
                                    </div>
                                )}
                            </div>
                            <HeartButton />
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 mt-4" />
                    </div>
                );
            })}
        </div>
    );
}