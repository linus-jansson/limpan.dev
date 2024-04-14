export const ProjectTags = ({children}: {children: React.ReactNode}) => {
    return <span className="font-thin tracking-widest">{children}</span>;
}

export const ProjectTitle = ({children}: {children: React.ReactNode}) => {
    return <h3 className="mb-2 text-2xl font-semibold text-primary">{children}</h3>;
}

export const ProjectDescription = ({children}: {children: React.ReactNode}) => {
    return <p>{children}</p>;
}

export const ProjectLinks = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="mt-4">
            <ul className="flex flex-row space-x-3">
                {children}
            </ul>
        </div>
    );
}

export const ProjectLink = ({children}: {children: React.ReactNode}) => {
    return <li>{children}</li>;
}

export const Project = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="p-6 rounded-md shadow-md bg-base-300 md:group-hover:opacity-50 md:hover:!opacity-100 duration-200 transition md:shadow-lg md:hover:shadow-2xl">
            {children}
        </div>
    );
}