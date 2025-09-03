'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProject() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        technologies: '',
        topics: '',
        desc: '',
        github: '',
        livelink: '',
        photos: '',
        user: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Convert comma-separated strings to arrays
            const projectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
                topics: formData.topics.split(',').map(topic => topic.trim()).filter(topic => topic),
                photos: formData.photos.split(',').map(photo => photo.trim()).filter(photo => photo),
                livelink: formData.livelink || undefined // Make optional if empty
            };

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Project added successfully!');
                setFormData({
                    name: '',
                    technologies: '',
                    topics: '',
                    desc: '',
                    github: '',
                    livelink: '',
                    photos: '',
                    user: ''
                });
                // Redirect to dashboard after successful submission
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                setMessage(`Error: ${result.error || 'Failed to add project'}`);
            }
        } catch (error) {
            setMessage('Error: Failed to submit form');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-neutral-900 rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-neutral-100 mb-6 text-center">
                        Add New Project
                    </h1>
                    
                    {message && (
                        <div className={`mb-4 p-3 rounded-md ${
                            message.includes('Error') 
                                ? 'bg-red-100 text-red-700 border border-red-300' 
                                : 'bg-green-100 text-green-700 border border-green-300'
                        }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-100 mb-2">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter project name"
                            />
                        </div>

                        <div>
                            <label htmlFor="technologies" className="block text-sm font-medium text-neutral-100 mb-2">
                                Technologies *
                            </label>
                            <input
                                type="text"
                                id="technologies"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="React, Node.js, PostgreSQL (comma-separated)"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate multiple technologies with commas</p>
                        </div>

                        <div>
                            <label htmlFor="topics" className="block text-sm font-medium text-neutral-100 mb-2">
                                Topics *
                            </label>
                            <input
                                type="text"
                                id="topics"
                                name="topics"
                                value={formData.topics}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Web Development, API, Database (comma-separated)"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate multiple topics with commas</p>
                        </div>

                        <div>
                            <label htmlFor="desc" className="block text-sm font-medium text-neutral-100 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="desc"
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Describe your project..."
                            />
                        </div>

                        <div>
                            <label htmlFor="github" className="block text-sm font-medium text-neutral-100 mb-2">
                                GitHub Repository *
                            </label>
                            <input
                                type="url"
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://github.com/username/repository"
                            />
                        </div>

                        <div>
                            <label htmlFor="livelink" className="block text-sm font-medium text-neutral-100 mb-2">
                                Live Link
                            </label>
                            <input
                                type="url"
                                id="livelink"
                                name="livelink"
                                value={formData.livelink}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://your-project.com (optional)"
                            />
                        </div>

                        <div>
                            <label htmlFor="photos" className="block text-sm font-medium text-neutral-100 mb-2">
                                Photo URLs *
                            </label>
                            <input
                                type="text"
                                id="photos"
                                name="photos"
                                value={formData.photos}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate multiple photo URLs with commas</p>
                        </div>

                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-neutral-100 mb-2">
                                User *
                            </label>
                            <input
                                type="text"
                                id="user"
                                name="user"
                                value={formData.user}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username or identifier"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-neutral-100 text-neutral-950 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Adding Project...' : 'Add Project'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard')}
                                className="flex-1 bg-neutral-800 border border-neutral-600 text-neutral-200 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
