export default function Project({params}:{
    params: {
        projectId : number
    }
}) {
    const projectId = params.projectId;
    return(
        <div>
            you landed on project {projectId}
        </div>
    )
};
