"use client";
import { useRef,useEffect } from "react";
import styles from './blob.module.css';
export const Blob: React.FC = () => {
    const blobRef = useRef<HTMLDivElement>(null);
    const animationSpeed = 0.1;

    const handleMouseMove = (e: MouseEvent) => {
        const blob = blobRef?.current;
        if(!blob) return;
        const { clientX, clientY } = e;
        const randomScale = Math.random() * 0.5 + 0.5;
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`,
            transform: `scale(${randomScale})`
        }, { duration: 3000, fill: "forwards" });
    }

    useEffect(() =>{
        window.addEventListener("pointermove", handleMouseMove);

        return () => {
            window.removeEventListener("pointermove", handleMouseMove);
        }
    }, [])


    return (
        <>
            <div className={styles.blob_blur}></div>
            <div ref={blobRef} className={styles.blob}></div>
        </>
    );
};