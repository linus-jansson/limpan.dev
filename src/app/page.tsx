import { BlobProvider } from "@/components/blob";
import { Card } from "@/components/card";
import React from "react";
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";


const SocialLinks = () => {
  return (
    <div className="flex space-x-4 text-2xl">
      <a href="#" className="text-gray-150 hover:text-gray-500">
        <FaGithub />
      </a>
      <a href="#" className="text-gray-150 hover:text-gray-500">
        <FaEnvelope />
      </a>
      <a href="#" className="text-gray-150 hover:text-gray-500">
        <FaLinkedin />
      </a>
    </div>
  );
}

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center" href="#main">
        {/* <div className="w-2 h-2 rounded-full bg-white animate-bounce" /> */}
        <FaArrowDown className="animate-bounce"/>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-col container mx-auto min-h-screen overflow-hidden mb-8">
      <BlobProvider/>
      <div className="relative grid place-items-center">
        <div className="flex items-center justify-center relative">
          <section className="flex flex-col items-center justify-center  h-full min-h-screen">
            <h1 className="text-7xl font-bold tracking-wider">Heading</h1>
            <p className="mt-2 text-center w-2/3 h-auto text-lg text-wrap mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
            <SocialLinks/>
            <ScrollIndicator />
          </section>
        </div>

        <section id="main">
          <div>
            <h2 className="text-5xl font-bold tracking-wider">Massa knappar</h2>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition duration-300">
              Button 1
            </button>
            <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition duration-300">
              Button 2
            </button>
            <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition duration-300">
              Button 3
            </button>
          </div>

          {/* Some cards with some stuff */}
          <div className="mt-96 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 transition-opacity group overflow-visible">
            {Array.from({ length: 24 }, (_, i) => (
              <Card key={i} title="title with some yes" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."/>
            ))}
          </div>

        </section>

      </div>
    </main>
  );
}
