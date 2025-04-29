import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Briefcase, Map, Sparkle } from "lucide-react"

const coreFeatures = [
    {
        title: "Zone Heatmap",
        description: (
            <>
                Instantly visualize <b>PUBG circle phases 1–8</b> across all matches. Filter by map and date, and switch between thermal, outline, or dot styles for deep zone insights.
            </>
        ),
        image: "/images/heatmap-placeholder.png",
        alt: "Heatmap Example",
    },
    {
        title: "Teams Management",
        description: (
            <>
                Build teams with names, logos, and player rosters for both live and event clients. Track rotations and generate drop maps with ease.
            </>
        ),
        image: "/images/teams-placeholder.png",
        alt: "Teams Management Example",
    },
    {
        title: "Services",
        description: (
            <>Automate data collection with jobs and monitor match metrics in real time for actionable insights.</>
        ),
        image: "/images/services-placeholder.png",
        alt: "Services Example",
    },
    {
        title: "AI Insights",
        description: (
            <>Predict final zones with AI or track killfeeds live from YouTube streams—integrated with your teams.</>
        ),
        image: "/images/ai-placeholder.png",
        alt: "AI Insights Example",
    },
    {
        title: "Drop Maps",
        description: (
            <>Manage lootspots and auto-generate drop maps for any PUBG lobby from simple text input.</>
        ),
        image: "/images/dropmap-placeholder.png",
        alt: "Drop Map Example",
    },
]

const sections = [
    {
        title: "Analytics",
        description: "Gain actionable insights to improve your team's performance.",
        icon: BarChart,
        tools: [
            {
                title: "Zone Heatmap",
                description:
                    "Visualize PUBG circle phases 1-8 across matches. Filter by map, date, and match type. Choose from thermal, outline, or dot visual styles.",
                href: "/dashboard/analytics/heatmap",
            },
            {
                title: "Team Rotations",
                description: "Analyze team rotations and strategies across matches.",
                href: "/dashboard/analytics/team-rotations",
            },
            {
                title: "Unplayable Maps",
                description: "Identify and analyze areas of maps that are unplayable.",
                href: "/dashboard/analytics/unplayable-maps",
            },
        ],
    },
    {
        title: "Services",
        description: "Automate data collection, track job progress, and monitor match/game metrics.",
        icon: Briefcase,
        tools: [
            {
                title: "Job Dashboard",
                description: "Automate and monitor background jobs for data collection and processing.",
                href: "/dashboard/jobs",
            },
            {
                title: "Metrics",
                description: "Track and analyze key performance metrics for your teams and matches.",
                href: "/dashboard/metrics",
            },
            {
                title: "Teams Management",
                description:
                    "Create teams with player names for live and event clients, assign a team name and logo, and use these teams to track rotations and generate drop maps.",
                href: "/dashboard/teams",
            },
        ],
    },
    {
        title: "AI Tools",
        description: "Leverage AI-powered tools for advanced analytics and insights.",
        icon: Sparkle,
        tools: [
            {
                title: "Zone Prediction",
                description: "Input up to X zones and a plane path to predict the final circle location using AI.",
                href: "/dashboard/ai/zone-ai",
            },
            {
                title: "Killfeed Tracker",
                description:
                    "Track killfeed events from a YouTube unlisted live stream and link kills to your teams automatically.",
                href: "/dashboard/ai/killfeed-ai",
            },
        ],
    },
    {
        title: "Drop Maps",
        description: "Create and manage drop maps for your teams.",
        icon: Map,
        tools: [
            {
                title: "Generator",
                description: "Generate drop maps for your teams based on match data.",
                href: "/dashboard/dropmaps/generator",
            },
            {
                title: "Logo Manager",
                description: "Manage team logos for use in drop maps.",
                href: "/dashboard/dropmaps/logo-manager",
            },
            {
                title: "Spots Manager",
                description: "Define and manage drop spots for your teams.",
                href: "/dashboard/dropmaps/spots-manager",
            },
        ],
    },
]

export default function DashboardLandingPage() {
    return (
        <div className="relative overflow-hidden">
            {/* Background wave pattern with gold accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background -z-10 overflow-hidden">
                <svg
                    className="absolute top-0 left-0 w-full h-full opacity-10"
                    viewBox="0 0 1440 800"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        fill="currentColor"
                        className="text-primary"
                    ></path>
                </svg>
                {/* Gold accent wave */}
                <svg
                    className="absolute bottom-0 right-0 w-full h-full opacity-10 translate-y-1/4"
                    viewBox="0 0 1440 800"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        fill="#F2A900"
                    ></path>
                </svg>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block rounded-full bg-pubg-gold/20 px-4 py-1.5 text-sm font-medium text-pubg-gold">
                            Nexus Dashboard
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                            Analyze everything your teams do
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md">
                            Your one-stop solution for managing teams, analyzing data, and optimizing performance in PUBG competitions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/dashboard/analytics/heatmap">
                                <Button size="lg" className="rounded-full bg-pubg-gold hover:bg-pubg-darkgold text-black">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/dashboard/teams">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full border-pubg-gold text-pubg-gold hover:bg-pubg-gold/10"
                                >
                                    Explore Features
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-pubg-gold/30 p-2 transform rotate-1">
                            <Image
                                src="/analytics-heatmap-dashboard.png"
                                width={800}
                                height={600}
                                alt="Dashboard Preview"
                                className="rounded-xl"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pubg-gold/20 rounded-full blur-xl"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>
                    </div>
                </div>
            </div>

            {/* Core Features Section - Alternating Layout with Wave Divider */}
            <div className="relative bg-muted/30">
                <div className="absolute top-0 left-0 w-full overflow-hidden">
                    <svg
                        className="relative block w-full h-12"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="fill-background"
                        ></path>
                    </svg>
                </div>

                <div className="container mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our comprehensive suite of tools helps you analyze, predict, and optimize your PUBG strategies.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {coreFeatures.map((feature, idx) => (
                            <div
                                key={feature.title}
                                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 space-y-4">
                                    <div className="inline-block rounded-full bg-pubg-gold/20 px-3 py-1 text-sm font-medium text-pubg-gold">
                                        Feature {idx + 1}
                                    </div>
                                    <h3 className="text-3xl font-bold">{feature.title}</h3>
                                    <div className="text-muted-foreground text-lg">{feature.description}</div>
                                    <Link href={sections[Math.min(idx, sections.length - 1)].tools[0].href}>
                                        <Button
                                            variant="outline"
                                            className="mt-2 border-pubg-gold text-pubg-gold hover:bg-pubg-gold/10"
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>

                                {/* Image with Fallback Alt */}
                                <div className="flex-1 relative">
                                    {feature.image ? (
                                        <div
                                            className={`relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-pubg-gold/30 p-2 transform ${idx % 2 === 0 ? "rotate-2" : "-rotate-2"}`}
                                        >
                                            <Image
                                                src={feature.image}
                                                width={500}
                                                height={300}
                                                alt={feature.alt}
                                                className="rounded-xl object-cover w-full h-64"
                                                // No onError on server, so just show alt text if image fails to load
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-64 bg-slate-200 rounded-xl border border-dashed border-slate-300 text-slate-500 text-lg">
                                            {feature.alt}
                                        </div>
                                    )}
                                    <div
                                        className={`absolute ${idx % 2 === 0 ? "-bottom-4 -right-4" : "-bottom-4 -left-4"} w-24 h-24 bg-pubg-gold/20 rounded-full blur-xl`}
                                    ></div>
                                    <div
                                        className={`absolute ${idx % 2 === 0 ? "-top-4 -left-4" : "-top-4 -right-4"} w-32 h-32 bg-primary/30 rounded-full blur-xl`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">All Features</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our complete suite of tools designed to give you the competitive edge.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sections.map((section, index) => (
                        <Card
                            key={index}
                            className="border border-muted bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-pubg-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-pubg-gold/10">
                                        <section.icon className="h-5 w-5 text-pubg-gold" />
                                    </div>
                                    <CardTitle>{section.title}</CardTitle>
                                </div>
                                <CardDescription>{section.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {section.tools.map((tool, toolIndex) => (
                                        <li key={toolIndex} className="group/item">
                                            <Link href={tool.href} className="block">
                                                <h3 className="text-sm font-medium text-pubg-gold group-hover/item:underline">{tool.title}</h3>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA Section with Gold Accents */}
            <div className="relative bg-gradient-to-b from-background to-pubg-gold/5 py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 left-0 w-full opacity-10"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            fill="#F2A900"
                        ></path>
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block rounded-full bg-pubg-gold/20 px-4 py-1.5 text-sm font-medium text-pubg-gold mb-4">
                            Get Started Today
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Ready to optimize your PUBG strategy?</h2>
                        <p className="text-muted-foreground mb-8">
                            Get started with our comprehensive suite of tools and take your game to the next level.
                        </p>
                        <Link href="/dashboard/analytics/heatmap">
                            <Button
                                size="lg"
                                className="rounded-full bg-pubg-gold hover:bg-pubg-darkgold text-black"
                            >
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Gold accent divider */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-pubg-gold to-transparent opacity-30"></div>
        </div>
    )
}