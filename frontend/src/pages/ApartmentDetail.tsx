import { useLocation, useNavigate } from 'react-router-dom';
import type { AirtableRecord } from './Home';

const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);
const AreaIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
);
const BedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9V4h20v5M2 20v-5h20v5M2 15H22M7 9a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
);
const BathIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12a9 9 0 0018 0M3 12V5a2 2 0 012-2h4a2 2 0 012 2v7" />
    </svg>
);
const PinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C12 21 5 13.5 5 9a7 7 0 1114 0c0 4.5-7 12-7 12z" />
        <circle cx="12" cy="9" r="2.5" />
    </svg>
);
const MessageIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);
const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default function ApartmentDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const record: AirtableRecord = state?.record;

    if (!record) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                <p>No apartment data found. <button onClick={() => navigate(-1)} className="text-indigo-600 underline">Go back</button></p>
            </div>
        );
    }

    const f = record.fields;

    const address: string = f['Address'] ?? f['Location'] ?? 'Unknown address';
    const price: string | number = f['Price'] ?? f['Rent'] ?? f['price'] ?? '';
    const sqft: string | number = f['Size'] ?? f['sqft'] ?? f['Area'] ?? '';
    const rooms: string | number = f['Number of rooms'] ?? f['Rooms'] ?? f['Bedrooms'] ?? '';
    const baths: string | number = f['Bathrooms'] ?? f['baths'] ?? '';
    const description: string = f['Description'] ?? f['description'] ?? '';
    const ownerName: string = f['Owner'] ?? f['owner'] ?? '';

    // Image
    const imageAttachment = f['images']?.[0] ?? null;
    const imageUrl: string | undefined =
        imageAttachment?.url ?? (typeof imageAttachment === 'string' ? imageAttachment : undefined);

    // Owner avatar
    const ownerAvatarAttachment = f['Owner picture']?.[0] ?? null;
    const ownerAvatarUrl: string | undefined =
        ownerAvatarAttachment?.url ?? (typeof ownerAvatarAttachment === 'string' ? ownerAvatarAttachment : undefined);

    // For the map embed, use the address as a search query
    const mapQuery = encodeURIComponent(address);

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
                <h1 className="text-base font-semibold text-gray-900 text-center">{address}</h1>
            </div>

            {/* Main photo */}
            <div className="px-6 mt-4">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                    {imageUrl ? (
                        <img src={imageUrl} alt={address} className="w-full h-full object-cover object-center" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <svg className="w-20 h-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Price */}
            {price !== '' && (
                <p className="text-center text-3xl font-bold text-gray-900 mt-5">
                    {price}€
                </p>
            )}

            {/* Stats row */}
            {(sqft !== '' || rooms !== '' || baths !== '') && (
                <div className="flex justify-center gap-8 mt-4 px-6">
                    {sqft !== '' && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <AreaIcon />
                            <span className="text-sm font-medium">{sqft} sqft</span>
                        </div>
                    )}
                    {rooms !== '' && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <BedIcon />
                            <span className="text-sm font-medium">{rooms} Bed</span>
                        </div>
                    )}
                    {baths !== '' && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <BathIcon />
                            <span className="text-sm font-medium">{baths} Bath</span>
                        </div>
                    )}
                </div>
            )}

            {/* Owner / Message buttons */}
            <div className="flex items-center gap-3 px-6 mt-5">
                <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                    {ownerAvatarUrl ? (
                        <img src={ownerAvatarUrl} alt={ownerName || 'Owner'} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <UserIcon />
                        </span>
                    )}
                    {ownerName ? ownerName : "Owner's Profile"}
                </button>
                <button
                    onClick={() => navigate('/messaging')}
                    className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                    Message owner <MessageIcon />
                </button>
            </div>

            {/* Description */}
            {description && (
                <div className="mx-6 mt-5 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
                </div>
            )}

            {/* Location / Map */}
            <div className="mx-6 mt-6 mb-10">
                <div className="flex items-center gap-2 mb-3">
                    <PinIcon />
                    <h3 className="text-base font-semibold text-gray-800">Location</h3>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <iframe
                        title="Apartment location"
                        width="100%"
                        height="100%"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=auto&layer=mapnik&query=${mapQuery}`}
                        style={{ border: 0 }}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
