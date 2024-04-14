import { Github } from "@/components/icons";
import { Project, ProjectDescription, ProjectLink, ProjectLinks, ProjectTags, ProjectTitle } from "@/components/projectCard";
import { Link } from "lucide-react";
import projects from "@/data/projects.json" assert { type: "json" };
import { PopoutMenu } from "@/components/header";

const Divider = ({ children }: { children: React.ReactNode }) => {
    return <div className="divider">{children}</div>;
}

const Projects = () => projects.map(project => {
    return (
        <Project key={project.id}>
            <ProjectTags>{project.type}</ProjectTags>
            <ProjectTitle>{project.title}</ProjectTitle>
            {project?.description && <ProjectDescription>{project.description}</ProjectDescription>}
            <ProjectLinks>
                <ProjectLink>
                    <a href={project.github}>
                        <Github /><span className="visually-hidden">Github</span>
                    </a>
                </ProjectLink>
                {project?.demo && (
                    <ProjectLink>
                        <a href={project.demo}>
                            <Link /><span className="visually-hidden">Demo</span>
                        </a>
                    </ProjectLink>
                )}
            </ProjectLinks>
        </Project>
    );
});

const Cc = () => {
    return (<p className="text-sm tracking-widest">Made with 🍞 by <span className="font-bold">l1mpan</span><sup> {new Date().getFullYear()}</sup></p>);
}

const Main = () => {
    return (
        <main className="px-6 pt-8">
            <div className="flex flex-col px-4 scroll-mt-12 lg:flex-row md:px-6">
                <div className="flex flex-col h-full md:fixed md:overflow-y-hidden md:w-1/3">
                    <div className="">
                        <h1 className="text-5xl font-bold">Hello, I am <span className="tracking-widest text-primary">Limpan!</span> Thanks for visiting my page!</h1>
                        <section className="pt-4 mb-6 space-y-2 text-lg" id="about">
                            <p className="font-bold">Software developer from Sweden!</p>
                            <p>My fascination with computers began in childhood, nurtured by countless hours of gaming. This hobby eventually evolved into a dedicated interest in software development, with a particular focus on full-stack development.</p>
                            <p>In addition to my professional work, I contribute to open-source projects in my free time, which are publicly available on <a href="https://github.com/linus-jansson" className="font-semibold underline text-primary">Github</a></p>
                            <p>Feel free to reach out to!</p>
                        </section>
                    </div>
                    <div className="hidden mt-auto mb-24 md:block">
                        <Cc />
                    </div>
                </div>
                <div className="md:w-2/3 md:ml-auto md:pr-12 md:pl-48 mb-12 w-full max-w-[1024px]">
                    <section id="projects" className="mb-6">
                        <Divider>
                            <h2 className="text-3xl -tracking-wider">Recent projects</h2>
                        </Divider>
                        <div className="mt-6 space-y-3 group">
                            <Projects />
                        </div>
                    </section>
                </div>
            </div>
            {/* Dark blur effect */}
            {/* <div className='bottom-0 left-0 hidden w-screen h-6 md:fixed bg-black/90 blur-lg'></div> */}
            <PopoutMenu />
        </main>
    )
}

export default function Home() {
    return (
        <>
            <Main />
            <footer className="static w-full py-2 text-center md:hidden">
                <Cc />
            </footer>
        </>

    );
}
