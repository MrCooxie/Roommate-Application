import type { AirtableRecord } from "../pages/Home";

interface ApartmentsProps {
    data: AirtableRecord[];
}

export default function Apartments({ data }: ApartmentsProps) {

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <svg className="w-12 h-12 mb-4 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
                <p className="text-lg font-medium">No apartments found</p>
                <p className="text-sm mt-1">Try refreshing or check back later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-8">
            <div className="grid grid-cols-1 gap-6">
                {data.map((record) => {
                    const f = record.fields;

                    // Airtable attachment fields are arrays of file objects: [{ url, filename, ... }]
                    const imageAttachment = f['images']?.[0];
                    const imageUrl: string | undefined =
                        imageAttachment?.url ??
                        (typeof imageAttachment === 'string' ? imageAttachment : undefined);

                    const address: string = f['Address'] ?? f['Location'] ?? 'Unknown address';
                    const rooms: string | number = f['Number of rooms'] ?? f['Rooms'] ?? f['Bedrooms'] ?? '—';

                    return (
                        <div
                            key={record.id}
                            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Address */}
                            <div className="pt-6 px-6 w-full">
                                <p className="text-xl font-bold text-gray-800">{address}</p>
                            </div>

                            {/* Image */}
                            <div className="mt-4 w-full aspect-[4/3] overflow-hidden">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={address}
                                        className="w-full h-full object-cover object-center"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Number of rooms */}
                            <div className="mt-4 px-6 pb-6 w-full">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18" />
                                    </svg>
                                    <span className="text-sm font-medium">{rooms} {rooms === 1 ? 'room' : 'rooms'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}