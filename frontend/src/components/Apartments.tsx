import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AirtableRecord } from "../pages/Home";

interface ApartmentsProps {
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

export default function Apartments({ data }: ApartmentsProps) {
    const navigate = useNavigate();
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-60 text-gray-300">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
                <p className="font-semibold text-gray-400">No apartments found</p>
                <p className="text-sm mt-1 text-gray-300">Try refreshing or check back later.</p>
            </div>
        );
    }

    return (
        <div className="px-5 pt-5">
            {data.map((record) => {
                const f = record.fields;

                const imageAttachment = f['images']?.[0];
                const imageUrl: string | undefined =
                    imageAttachment?.url ??
                    (typeof imageAttachment === 'string' ? imageAttachment : undefined);

                const address: string = f['Address'] ?? f['Location'] ?? 'Unknown address';
                const price: string | number = f['Price'] ?? f['Rent'] ?? f['Price per person'] ?? '—';
                const tenants: string | number = f['Tenants'] ?? f['Max tenants'] ?? f['Number of tenants'] ?? '—';

                return (
                    <div
                        key={record.id}
                        className="mb-7 cursor-pointer"
                        onClick={() => navigate(`/apartment/${record.id}`, { state: { fields: record.fields } })}
                    >
                        {/* Address */}
                        <p className="text-xl font-bold text-gray-900 mb-3">{address}</p>

                        {/* Image */}
                        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={address}
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Price + Tenants + Heart */}
                        <div className="flex items-center justify-between mt-3">
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {price !== '—' ? `${price}€/month per person` : 'Price not listed'}
                                </p>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {tenants !== '—' ? `Up to ${tenants} tenants` : 'Tenants not listed'}
                                </p>
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