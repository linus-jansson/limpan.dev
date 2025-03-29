import { BlobProvider } from "./BlobProvider";
import React from "react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 p-8 text-white">
      <BlobProvider/>
      <div className="relative grid place-items-center">
        <h1 className="text-7xl font-bold tracking-wider">Heading</h1>
        <p className="mt-2 text-center w-2/3 h-auto text-lg text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatibus.
        </p>
      </div>
    </main>
  );
}
