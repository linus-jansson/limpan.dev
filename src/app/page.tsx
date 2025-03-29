import { BlobProvider } from "./BlobProvider";
import React from "react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 p-8 text-white">
      <BlobProvider/>
      <div className="relative grid place-items-center">
        <section>
          <h1 className="text-7xl font-bold tracking-wider">Heading</h1>
          <p className="mt-2 text-center w-2/3 h-auto text-lg text-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatibus.
          </p>
        </section>




        <section className="mt-4 flex flex-col gap-2">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition duration-300">
            Button 1
          </button>
          <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition duration-300">
            Button 2
          </button>
          <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition duration-300">
            Button 3
          </button>

        </section>

        {/* Some cards with some stuff */}
        <section className="mt-96 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 1</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 2</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 3</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 1</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 2</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 3</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 1</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 2</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 3</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 1</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 2</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 3</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
          <div className="rounded bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-semibold">Card 4</h2>
            <p className="mt-2 text-sm">Some content here.</p>
          </div>
        </section>


      </div>
    </main>
  );
}
