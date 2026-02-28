import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "GitHub Solutions",
        description: "Explore my CI/CD pipelines, Infrastructure as Code (IaC), and automation scripts.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
        link: "https://github.com/Akash-879",
    },
    {
        id: 2,
        title: "Professional Network",
        description: "Connect with me to discuss scalable cloud architecture, Kubernetes, and reliable deployments.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        link: "https://www.linkedin.com/in/aakash-rathod-devops/",
    },
    {
        id: 3,
        title: "Career & Experience",
        description: "View my professional journey, cloud certifications, and technical skills profile.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop",
        link: "https://drive.google.com/file/d/1C1wIleSn71cWpyo5nkbuvtvIRtVkmkD1/view?usp=drive_link",
    },
    {
        id: 4,
        title: "Let's Collaborate",
        description: "Available for infrastructure consultations, cloud migrations, and freelance engineering.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        link: "https://wa.me/918999465345",
    },
];

export default function Projects() {
    return (
        <section className="min-h-screen bg-[#121212] py-32 px-8 md:px-24">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6 drop-shadow-md pb-2">
                    Professional Hub
                </h2>
                <p className="text-xl text-neutral-400 mb-16 max-w-2xl border-l-2 border-neutral-800 pl-4">
                    A central directory to explore my infrastructure work, professional background, and ways to connect.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const cardContent = (
                            <div
                                className="group relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 p-6 transition-all duration-300 hover:bg-[#222222] hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] cursor-pointer h-full flex flex-col"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                            </div>
                        );

                        return project.link ? (
                            <a href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" className="block h-full">
                                {cardContent}
                            </a>
                        ) : (
                            <div key={project.id} className="h-full">
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
