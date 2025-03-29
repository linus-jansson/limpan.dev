"use client";

import { MouseBlob } from "@/components/mouse-blob";
import { useMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";


export const BlobProvider = ({}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMobile();

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (!isMounted || isMobile) return null;

  return (<MouseBlob mousePosition={mousePosition} />);
}