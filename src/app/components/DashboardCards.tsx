import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardCards() {
    const session = useSession();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [techFilter, setTechFilter] = useState('');

    useEffect(() => {
        async function getProjectDetail() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/projects');
            setProjects(response.data || []); // Fallback to empty array if no data
        } catch (e) {
            console.error('Error fetching projects:', e);
        } finally {
            setIsLoading(false);
        }
        }

        if (session?.status === 'authenticated' && session?.data?.user) {
        getProjectDetail();
        }
    }, [session?.status, session]);

    const filteredProjects = techFilter
        ? projects.filter((project) => project?.technologies.includes(techFilter))
        : projects;

    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }

    return(
        <div className="border border-dashed p-6 flex-1 overflow-auto">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => (
              <div key={index} className="border p-2 h-80 w-48">
                <p className="font-bold">{project.name || 'Untitled Project'}</p>
                <p>Tech: {project.technologies?.join(', ') || 'N/A'}</p>
                <p>{project.desc || 'No description available'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    )
};
