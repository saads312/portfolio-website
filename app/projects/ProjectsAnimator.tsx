"use client";
import { useEffect } from "react";
import { animate, stagger } from "animejs";

export function ProjectsAnimator() {
  useEffect(() => {
    // Heading
    animate(".projects-heading", {
      opacity: [0, 1],
      y: [20, 0],
      duration: 550,
      ease: "outExpo",
      delay: 50,
    });

    // Featured card
    animate(".project-featured", {
      opacity: [0, 1],
      y: [30, 0],
      duration: 600,
      ease: "outExpo",
      delay: 150,
    });

    // Side cards
    animate(".project-side", {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(90, { start: 250 }),
      duration: 550,
      ease: "outExpo",
    });

    // Grid cards
    animate(".project-grid-card", {
      opacity: [0, 1],
      y: [24, 0],
      delay: stagger(70, { start: 400 }),
      duration: 500,
      ease: "outExpo",
    });
  }, []);

  return null;
}
