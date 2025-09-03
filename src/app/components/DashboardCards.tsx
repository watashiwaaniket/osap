'use client';

import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
    id: number;
    name: string;
    technologies: string[];
    topics: string[];
    desc: string;
    github: string;
    livelink?: string;
    photos: string[];
    user: string;
}

interface DashboardCardsProps {
    searchQuery?: string;
    techFilter?: string;
}

export default function DashboardCards({ searchQuery = '', techFilter = '' }: DashboardCardsProps) {
    const session = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getProjectDetail() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data || []);
                } else {
                    console.error('Failed to fetch projects');
                    setProjects([]);
                }
            } catch (e) {
                console.error('Error fetching projects:', e);
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        }

        if (session?.status === 'authenticated' && session?.data?.user) {
            getProjectDetail();
        }
    }, [session?.status, session]);

    // Apply both search and tech filters
    const filteredProjects = projects.filter((project) => {
        const matchesSearch = !searchQuery || 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.user.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTech = !techFilter || 
            project.technologies?.some(tech => 
                tech.toLowerCase().includes(techFilter.toLowerCase())
            );
        
        return matchesSearch && matchesTech;
    });

    const handleProjectClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    if (session.status === 'loading') {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-400">Loading...</div>
            </div>
        );
    }

    if (!session.data?.user) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-400">Please sign in to view projects</div>
            </div>
        );
    }

    return (
        <div className="p-6 flex-1 overflow-auto">
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-neutral-400">Loading projects...</div>
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => handleProjectClick(project.id)}
                            className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 cursor-pointer hover:border-neutral-500 hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            {/* Project Image */}
                            <div className="mb-4 h-40 overflow-hidden rounded-md">
                                {project.photos && project.photos.length > 0 ? (
                                    <img 
                                        src={project.photos[0]} 
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://via.placeholder.com/300x200/374151/9CA3AF?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                                        <span className="text-neutral-500 text-sm">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Project Info */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg text-neutral-100 truncate">
                                    {project.name || 'Untitled Project'}
                                </h3>
                                
                                <p className="text-neutral-300 text-sm line-clamp-2">
                                    {project.desc || 'No description available'}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies?.slice(0, 3).map((tech, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 bg-blue-600 text-neutral-100 rounded-full text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies && project.technologies.length > 3 && (
                                        <span className="px-2 py-1 bg-neutral-700 text-neutral-300 rounded-full text-xs">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-1">
                                    {project.topics?.slice(0, 2).map((topic, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 bg-neutral-700 text-neutral-300 rounded-full text-xs"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                {/* User */}
                                <p className="text-neutral-400 text-xs">
                                    by {project.user}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-neutral-400 mb-4">
                            {searchQuery || techFilter ? 'No projects found matching your filters' : 'No projects found'}
                        </p>
                        {(searchQuery || techFilter) && (
                            <p className="text-neutral-500 text-sm">
                                Try adjusting your search or filter criteria
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
