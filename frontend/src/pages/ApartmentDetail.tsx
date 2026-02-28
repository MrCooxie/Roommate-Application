import { useLocation, useNavigate } from 'react-router-dom';

export interface ApartmentFields {
    Address?: string;
    Location?: string;
    Price?: string | number;
    Rent?: string | number;
    'Price per person'?: string | number;
    Sqft?: string | number;
    'Square footage'?: string | number;
    Beds?: string | number;
    Bedrooms?: string | number;
    'Number of rooms'?: string | number;
    Baths?: string | number;
    Bathrooms?: string | number;
    Description?: string;
    images?: { url: string }[];
    'Owner name'?: string;
    'Owner avatar'?: { url: string }[];
    [key: string]: any;
}

// ─── Reusable stat chip ──────────────────────────────────────────────────────
function StatChip({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
            <span className="text-gray-500">{icon}</span>
            <span className="text-sm font-medium text-gray-800">{label}</span>
        </div>
    );
}

// ─── Nav icon button ─────────────────────────────────────────────────────────
function NavBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-transparent border-none cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors"
        >
            {children}
        </button>
    );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const AreaIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
);
const BedIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6" />
        <path d="M2 14V8a2 2 0 012-2h3v4H2z" />
        <path d="M2 8h20" />
    </svg>
);
const BathIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z" />
        <path d="M4 12V5a2 2 0 012-2h1a2 2 0 012 2v1" />
    </svg>
);
const PinIcon = () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const ChatIcon = () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);
const UserIcon = ({ size = 14, color = '#999' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
);

// ─── Bottom nav ────────────────────────────────────────────────────────────────
function BottomNav({ onHome }: { onHome: () => void }) {
    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/90 backdrop-blur border-t border-gray-100 flex justify-around items-center py-3 z-50">
            <NavBtn onClick={onHome}>
                <svg width="24" height="24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 12l9-9 9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18V12" />
                </svg>
            </NavBtn>
            <NavBtn>
                <svg width="24" height="24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
            </NavBtn>
            <NavBtn>
                <svg width="24" height="24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
            </NavBtn>
        </nav>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ApartmentDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const fields: ApartmentFields = location.state?.fields ?? {};

    const address: string = fields['Address'] ?? 'Unknown address';
    const price: string | number = fields['Rent'] ?? '';
    const sqft: string | number = fields['Sqft'] ?? '';
    const beds: string | number = fields['Beds'] ?? fields['Bedrooms'] ?? fields['Number of rooms'] ?? '';
    const baths: string | number = fields['Baths'] ?? fields['Bathrooms'] ?? '';
    const description: string = fields['Description'] ?? '';
    const ownerName: string = fields['Owner name'] ?? 'Owner';

    const imageAttachment = fields['images']?.[0];
    const imageUrl: string | undefined =
        imageAttachment?.url ?? (typeof imageAttachment === 'string' ? imageAttachment : undefined);

    const ownerAvatar = fields['Owner avatar']?.[0];
    const ownerAvatarUrl: string | undefined =
        ownerAvatar?.url ?? (typeof ownerAvatar === 'string' ? ownerAvatar : undefined);

    const mapQuery = encodeURIComponent(address);
    const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=15`;

    const stats = [
        sqft !== '' && { icon: <AreaIcon />, label: `${sqft} sqft` },
        beds !== '' && { icon: <BedIcon />, label: `${beds} Bed` },
        baths !== '' && { icon: <BathIcon />, label: `${baths} Bath` },
    ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 max-w-lg mx-auto relative">

            {/* ── Top bar ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 pt-8 pb-3 bg-gray-50">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-700 text-xl font-light cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    ‹
                </button>
                <span className="text-sm font-semibold text-gray-900 truncate max-w-[60%] text-center">
                    {address}
                </span>
                {/* Spacer to keep title centered */}
                <div className="w-9" />
            </div>

            {/* ── Scrollable body ─────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-28 px-4 space-y-4">

                {/* Hero image card */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-sm">
                    {imageUrl ? (
                        <img src={imageUrl} alt={address} className="w-full h-full object-cover object-center" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                            </svg>
                        </div>
                    )}

                    {/* Price badge overlaid on image */}
                    {price !== '' && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2 shadow-md">
                            <span className="text-2xl font-bold text-gray-900">{price}€</span>
                            <span className="text-sm text-gray-500 ml-1">/mo</span>
                        </div>
                    )}
                </div>

                {/* Stats row */}
                {stats.length > 0 && (
                    <div className="flex gap-2.5">
                        {stats.map((s) => (
                            <StatChip key={s.label} icon={s.icon} label={s.label} />
                        ))}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-900 bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                        {ownerAvatarUrl ? (
                            <img src={ownerAvatarUrl} alt={ownerName} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                                <UserIcon />
                            </div>
                        )}
                        Owner's Profile
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#8EC19D] rounded-2xl py-3.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer border-none">
                        Message owner
                        <ChatIcon />
                    </button>
                </div>

                {/* Description card */}
                {description && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">About this place</p>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
                    </div>
                )}

                {/* Location card */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
                        <span className="text-gray-500"><PinIcon /></span>
                        <span className="text-sm font-semibold text-gray-900">Location</span>
                    </div>
                    <div className="h-52 bg-gray-100">
                        <iframe
                            title="location-map"
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <BottomNav onHome={() => navigate('/')} />
        </div>
    );
}
