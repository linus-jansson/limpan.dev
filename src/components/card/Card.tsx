import React from "react";


type CardProps = {
  title: string;
  body: string;
} & React.RefAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ title, body }, ref) => {
  return (
    <div
      ref={ref}
      className="rounded bg-gray-800 p-4 shadow-lg hover:shadow-x md:group-hover:opacity-50 md:hover:!opacity-100 duration-200 transition md:shadow-lg md:hover:shadow-2xl md:hover:scale-105"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm">{body}</p>
    </div>
  );
});