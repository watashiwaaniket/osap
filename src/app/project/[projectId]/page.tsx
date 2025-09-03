'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function Project({ params }: {
    params: {
        projectId: string;
    }
}) {
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${params.projectId}`);
                if (!response.ok) {
                    throw new Error('Project not found');
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch project');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [params.projectId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-neutral-100 text-xl">Loading project...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">{error || 'Project not found'}</div>
                    <Link 
                        href="/dashboard"
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center text-neutral-400 hover:text-neutral-200 mb-4 transition-colors"
                    >
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-neutral-100 mb-2">{project.name}</h1>
                    <p className="text-neutral-400">by {project.user}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Description</h2>
                            <p className="text-neutral-300 leading-relaxed">{project.desc}</p>
                        </div>

                        {/* Technologies */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-blue-600 text-neutral-100 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Topics */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Topics</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.topics.map((topic, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded-full text-sm"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Photos */}
                        {project.photos.length > 0 && (
                            <div className="bg-neutral-900 rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Project Images</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.photos.map((photo, index) => (
                                        <div key={index} className="relative group">
                                            <img 
                                                src={photo} 
                                                alt={`${project.name} - Image ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://via.placeholder.com/400x300/374151/9CA3AF?text=Image+Not+Found';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Info Card */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Project Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-neutral-400 text-sm">Project ID:</span>
                                    <p className="text-neutral-200">#{project.id}</p>
                                </div>
                                <div>
                                    <span className="text-neutral-400 text-sm">Created by:</span>
                                    <p className="text-neutral-200">{project.user}</p>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Links</h3>
                            <div className="space-y-3">
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2 px-4 rounded-md text-center transition-colors border border-neutral-600"
                                >
                                    View on GitHub
                                </a>
                                {project.livelink && (
                                    <a 
                                        href={project.livelink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-blue-600 hover:bg-blue-700 text-neutral-100 py-2 px-4 rounded-md text-center transition-colors"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-neutral-900 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Actions</h3>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => router.push(`/editproject/${project.id}`)}
                                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-950 py-2 px-4 rounded-md transition-colors"
                                >
                                    Edit Project
                                </button>
                                <button 
                                    onClick={() => router.push('/addproject')}
                                    className="w-full bg-neutral-800 border border-neutral-600 hover:bg-neutral-700 text-neutral-200 py-2 px-4 rounded-md transition-colors"
                                >
                                    Add New Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
