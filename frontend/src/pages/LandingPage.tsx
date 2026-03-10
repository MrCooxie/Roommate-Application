import { useNavigate } from 'react-router-dom';

/* ─── Icon Components ─── */

const SearchIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

const HomeIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M3 12v9h18V12" />
    </svg>
);

const UsersIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

const ChatIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
    </svg>
);

const KeyIcon = () => (
    <svg width="32" height="32" fill="none" stroke="#8EC19D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const ArrowRight = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

/* ─── Feature Card ─── */

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.03] hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-[#8EC19D]/15 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
}

/* ─── Step Card ─── */

interface StepCardProps {
    number: number;
    icon: React.ReactNode;
    title: string;
    description: string;
}

function StepCard({ number, icon, title, description }: StepCardProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#8EC19D] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#8EC19D]/30">
                    {number}
                </div>
            </div>
            <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="opacity-60">{icon}</span>
                    <h3 className="text-base font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

/* ─── Landing Page ─── */

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto">

            {/* ── Hero Section ── */}
            <section className="px-6 pt-14 pb-10 text-center">
                {/* Logo / Brand Mark */}
                <div className="w-16 h-16 rounded-2xl bg-[#8EC19D] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#8EC19D]/30">
                    <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M3 12l9-9 9 9" />
                        <path d="M9 21V12h6v9" />
                        <path d="M3 12v9h18V12" />
                    </svg>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                    Find Your Perfect<br />
                    <span className="text-[#8EC19D]">Roommate</span>
                </h1>

                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                    Browse apartments, discover compatible roommates, and connect instantly — all in one place.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 bg-[#8EC19D] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-[#8EC19D]/30 hover:shadow-xl hover:shadow-[#8EC19D]/40 transition-all duration-200 hover:scale-[1.03] cursor-pointer border-none"
                    >
                        Get Started
                        <ArrowRight />
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="h-px bg-gray-100 mx-6" />

            {/* ── Features Section ── */}
            <section className="px-6 py-10">
                <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                    Everything You Need
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <FeatureCard
                        icon={<HomeIcon />}
                        title="Browse Apartments"
                        description="Explore verified listings with photos, pricing, and detailed information."
                    />
                    <FeatureCard
                        icon={<UsersIcon />}
                        title="Find Roommates"
                        description="Discover people who match your lifestyle, budget, and preferences."
                    />
                    <FeatureCard
                        icon={<ChatIcon />}
                        title="Connect Instantly"
                        description="Message potential roommates directly and arrange viewings in seconds."
                    />
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="h-px bg-gray-100 mx-6" />

            {/* ── How It Works ── */}
            <section className="px-6 py-10">
                <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
                    How It Works
                </h2>

                <div className="flex flex-col gap-8">
                    <StepCard
                        number={1}
                        icon={<SearchIcon />}
                        title="Browse"
                        description="Search through apartments and roommate profiles to find what suits you."
                    />
                    <StepCard
                        number={2}
                        icon={<CheckIcon />}
                        title="Match"
                        description="Like profiles you're interested in and see who matches your preferences."
                    />
                    <StepCard
                        number={3}
                        icon={<KeyIcon />}
                        title="Move In"
                        description="Connect with your match, arrange a viewing, and settle into your new home."
                    />
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="h-px bg-gray-100 mx-6" />

            {/* ── Bottom CTA ── */}
            <section className="px-6 py-12 text-center">
                <div className="bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Ready to find your place?
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Join hundreds of students already using the platform.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/home')}
                            className="w-full flex items-center justify-center gap-2 bg-[#8EC19D] text-white py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-[#8EC19D]/30 hover:shadow-xl hover:shadow-[#8EC19D]/40 transition-all duration-200 hover:scale-[1.02] cursor-pointer border-none"
                        >
                            Browse Listings
                            <ArrowRight />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-white text-gray-800 py-3.5 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="px-6 py-6 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    © 2026 Roommate Finder. Made with ❤️
                </p>
            </footer>
        </div>
    );
}
