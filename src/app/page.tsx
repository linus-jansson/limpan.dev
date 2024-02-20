import { Separator } from "@/components/ui/separator"



export const Footer = () => {
    return (
        <footer className="sticky bottom-0">
            <Separator/>
            <div className="flex h-5 items-center space-x-3 text-sm justify-center">
                <span>Limpan {'🍞'}</span>
                <span>{new Date().getFullYear()}</span>
                <Separator orientation="vertical" /> 
                <ul className="flex space-x-2">
                    <li><a href="http://github.com/linus-jansson" className="underline">Github</a></li>
                    <li><a href="mailto:conta" className="underline">Mail</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default function Home() {
  return (
    <>
        <main className="grid place-content-start p-6 h-screen mt-0">
            <h1 className="font-bold text-3xl">Hey there!</h1>
            <p className="font-sembold">I am a software developer based in Sweden</p>
        </main>
        <Footer></Footer>
    </>
  );
}
