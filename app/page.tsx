import { Blob } from "@/components/Blob"
import {Github, Pgp} from "@/components/Icons"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 p-8 text-white">
      <Blob />
      <div className="relative z-10 max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl">Hello, I’m Limpan.</h1>
        <p className="mb-8 text-lg opacity-80">
          Software developer from Sweden with a focus on full-stack work. I also enjoy hacking on open-source in my spare time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://pgp.limpan.dev/AC78-8466-C4CA-42E0-9BFA-B368-552C-6438-ED63-E0A0.asc" className="flex flew-col gap-1 items-center rounded-full border border-white bg-transparent px-6 py-3 font-medium text-white transition-transform hover:scale-105">
            <Pgp />{' '}PGP
          </a>
          <a href="https://github.com/linus-jansson" className="flex flew-col gap-1 items-center rounded-full border border-white bg-transparent px-6 py-3 font-medium text-white transition-transform hover:scale-105">
            <Github />{' '}Github
          </a>
        </div>
      </div>
    </main>
  )
}

