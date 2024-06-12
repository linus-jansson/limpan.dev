import Link from "next/link";
import { Email, Github } from "./icons";
import { FileLock2 } from "lucide-react";

export function PopoutMenu() {
    return (
        <header className="z-50 shadow-2xl w-30" id="mobile-navigation-menu">
            <div className="fixed space-y-6 transition-all duration-150 -right-3 menu bg-base-300 rounded-l-box md:-right-12 md:hover:right-0 bottom-20">
                <span className="hidden w-0 h-0 md:fixed md:w-3 md:h-3 md:flex">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
                    <span className="relative inline-flex w-3 h-3 rounded-full bg-primary"></span>
                </span>
                <ul>
                    <li>
                        <a className="tooltip tooltip-left"
                            data-tip="Github"
                            target="_blank"
                            aria-label="Link to github profile"
                            href="https://github.com/linus-jansson"
                        >
                            <Github />
                            <span className="visually-hidden">Github Account</span>
                        </a>
                    </li>
                    <li>
                        <Link className="tooltip tooltip-left"
                            data-tip="Contact"
                            href="contact"
                        >
                            <Email/>
                            <span className="visually-hidden">Contact me on email</span>
                        </Link>
                    </li>
                    <li>
                        <a className="tooltip tooltip-left"
                            data-tip="Pgp-key"
                            href="/limpan.pgp-key.asc"
                            download={true}
                        >
                            <span className="font-semibold"><FileLock2 height={24} />PGP</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
