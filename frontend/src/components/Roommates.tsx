import type { AirtableRecord } from "../pages/Home";

interface RoommatesProps {
    data: AirtableRecord[];
}

export default function Roommates({ data }: RoommatesProps) {

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <svg className="w-12 h-12 mb-4 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <p className="text-lg font-medium">No roommates found</p>
                <p className="text-sm mt-1">Try refreshing or check back later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-8">
            <div className="grid grid-cols-1 gap-6">
                {data.map((record) => {
                    const f = record.fields;

                    // Airtable image field is an array of attachment objects
                    // Airtable attachment fields are arrays of file objects: [{ url, filename, ... }]
                    const imageAttachment =
                        f['profile picture']?.[0] ??
                        null;

                    const imageUrl: string | undefined =
                        imageAttachment?.url ??
                        (typeof imageAttachment === 'string' ? imageAttachment : undefined);

                    const name: string = f['Name'];
                    const age: string | number = "0"
                    const city: string = "Unknown"
                    const school: string = "Unknown"

                    return (
                        <div
                            key={record.id}
                            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Name & Age */}
                            <div className="pt-6 px-6 w-full">
                                <p className="text-xl font-bold text-gray-800">
                                    {name}{age !== '' ? `, ${age}` : ''}
                                </p>
                            </div>

                            {/* Image */}
                            <div className="mt-4 w-full aspect-[4/5] overflow-hidden">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* City */}
                            {city && (
                                <div className="mt-4 px-6 w-full">
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                        <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">{city}</span>
                                    </div>
                                </div>
                            )}

                            {/* School */}
                            {school && (
                                <div className="mt-2 px-6 pb-6 w-full">
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                        <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 21H3a12.083 12.083 0 012.84-10.422L12 14z" />
                                        </svg>
                                        <span className="text-sm font-medium">{school}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}