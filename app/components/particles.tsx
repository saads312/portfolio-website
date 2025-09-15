// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useMousePosition } from "@/util/mouse";

// interface ParticlesProps {
// 	className?: string;
// 	quantity?: number;
// 	staticity?: number;
// 	ease?: number;
// 	refresh?: boolean;
// }

// export default function Particles({
// 	className = "",
// 	quantity = 50,
// 	staticity = 30,
// 	ease = 50,
// 	refresh = false,
// }: ParticlesProps) {
// 	const canvasRef = useRef<HTMLCanvasElement>(null);
// 	const canvasContainerRef = useRef<HTMLDivElement>(null);
// 	const context = useRef<CanvasRenderingContext2D | null>(null);
// 	const circles = useRef<any[]>([]);
// 	const mousePosition = useMousePosition();
// 	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
// 	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
// 	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

// 	useEffect(() => {
// 		if (canvasRef.current) {
// 			context.current = canvasRef.current.getContext("2d");
// 		}
// 		initCanvas();
// 		animate();
// 		window.addEventListener("resize", initCanvas);

// 		return () => {
// 			window.removeEventListener("resize", initCanvas);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		onMouseMove();
// 	}, [mousePosition.x, mousePosition.y]);

// 	useEffect(() => {
// 		initCanvas();
// 	}, [refresh]);

// 	const initCanvas = () => {
// 		resizeCanvas();
// 		drawParticles();
// 	};

// 	const onMouseMove = () => {
// 		if (canvasRef.current) {
// 			const rect = canvasRef.current.getBoundingClientRect();
// 			const { w, h } = canvasSize.current;
// 			const x = mousePosition.x - rect.left - w / 2;
// 			const y = mousePosition.y - rect.top - h / 2;
// 			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
// 			if (inside) {
// 				mouse.current.x = x;
// 				mouse.current.y = y;
// 			}
// 		}
// 	};

// 	type Circle = {
// 		x: number;
// 		y: number;
// 		translateX: number;
// 		translateY: number;
// 		size: number;
// 		alpha: number;
// 		targetAlpha: number;
// 		dx: number;
// 		dy: number;
// 		magnetism: number;
// 	};

// 	const resizeCanvas = () => {
// 		if (canvasContainerRef.current && canvasRef.current && context.current) {
// 			circles.current.length = 0;
// 			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
// 			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
// 			canvasRef.current.width = canvasSize.current.w * dpr;
// 			canvasRef.current.height = canvasSize.current.h * dpr;
// 			canvasRef.current.style.width = `${canvasSize.current.w}px`;
// 			canvasRef.current.style.height = `${canvasSize.current.h}px`;
// 			context.current.scale(dpr, dpr);
// 		}
// 	};

// 	const circleParams = (): Circle => {
// 		const x = Math.floor(Math.random() * canvasSize.current.w);
// 		const y = Math.floor(Math.random() * canvasSize.current.h);
// 		const translateX = 0;
// 		const translateY = 0;
// 		const size = Math.floor(Math.random() * 2) + 0.1;
// 		const alpha = 0;
// 		const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
// 		const dx = (Math.random() - 0.5) * 0.2;
// 		const dy = (Math.random() - 0.5) * 0.2;
// 		const magnetism = 0.1 + Math.random() * 4;
// 		return {
// 			x,
// 			y,
// 			translateX,
// 			translateY,
// 			size,
// 			alpha,
// 			targetAlpha,
// 			dx,
// 			dy,
// 			magnetism,
// 		};
// 	};

// 	const drawCircle = (circle: Circle, update = false) => {
// 		if (context.current) {
// 			const { x, y, translateX, translateY, size, alpha } = circle;
// 			context.current.translate(translateX, translateY);
// 			context.current.beginPath();
// 			context.current.arc(x, y, size, 0, 2 * Math.PI);
// 			context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
// 			context.current.fill();
// 			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

// 			if (!update) {
// 				circles.current.push(circle);
// 			}
// 		}
// 	};

// 	const clearContext = () => {
// 		if (context.current) {
// 			context.current.clearRect(
// 				0,
// 				0,
// 				canvasSize.current.w,
// 				canvasSize.current.h,
// 			);
// 		}
// 	};

// 	const drawParticles = () => {
// 		clearContext();
// 		const particleCount = quantity;
// 		for (let i = 0; i < particleCount; i++) {
// 			const circle = circleParams();
// 			drawCircle(circle);
// 		}
// 	};

// 	const remapValue = (
// 		value: number,
// 		start1: number,
// 		end1: number,
// 		start2: number,
// 		end2: number,
// 	): number => {
// 		const remapped =
// 			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
// 		return remapped > 0 ? remapped : 0;
// 	};

// 	const animate = () => {
// 		clearContext();
// 		circles.current.forEach((circle: Circle, i: number) => {
// 			// Handle the alpha value
// 			const edge = [
// 				circle.x + circle.translateX - circle.size, // distance from left edge
// 				canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
// 				circle.y + circle.translateY - circle.size, // distance from top edge
// 				canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
// 			];
// 			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
// 			const remapClosestEdge = parseFloat(
// 				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
// 			);
// 			if (remapClosestEdge > 1) {
// 				circle.alpha += 0.02;
// 				if (circle.alpha > circle.targetAlpha) {
// 					circle.alpha = circle.targetAlpha;
// 				}
// 			} else {
// 				circle.alpha = circle.targetAlpha * remapClosestEdge;
// 			}
// 			circle.x += circle.dx;
// 			circle.y += circle.dy;
// 			circle.translateX +=
// 				(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
// 				ease;
// 			circle.translateY +=
// 				(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
// 				ease;
// 			// circle gets out of the canvas
// 			if (
// 				circle.x < -circle.size ||
// 				circle.x > canvasSize.current.w + circle.size ||
// 				circle.y < -circle.size ||
// 				circle.y > canvasSize.current.h + circle.size
// 			) {
// 				// remove the circle from the array
// 				circles.current.splice(i, 1);
// 				// create a new circle
// 				const newCircle = circleParams();
// 				drawCircle(newCircle);
// 				// update the circle position
// 			} else {
// 				drawCircle(
// 					{
// 						...circle,
// 						x: circle.x,
// 						y: circle.y,
// 						translateX: circle.translateX,
// 						translateY: circle.translateY,
// 						alpha: circle.alpha,
// 					},
// 					true,
// 				);
// 			}
// 		});
// 		window.requestAnimationFrame(animate);
// 	};

// 	return (
// 		<div className={className} ref={canvasContainerRef} aria-hidden="true">
// 			<canvas ref={canvasRef} />
// 		</div>
// 	);
// }

"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticlesProps {
	className?: string;
	pathCount?: number;
	electronSpeed?: number;
	trailLength?: number;
	brightness?: number;
}

export default function Particles({
	className = "",
	pathCount = 5,
	electronSpeed = 2,
	trailLength = 40,
	brightness = 0.8,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const paths = useRef<Path[]>([]);
	const electrons = useRef<Electron[]>([]);
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const animationId = useRef<number>();
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	type Point = {
		x: number;
		y: number;
	};

	type Path = {
		points: Point[];
		length: number;
	};

	type Electron = {
		pathIndex: number;
		progress: number; // 0 to 1 along the path
		trail: Point[];
		speed: number;
	};

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		generatePaths();
		createElectrons();
		animate();

		const handleResize = () => {
			initCanvas();
			generatePaths();
			createElectrons();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (animationId.current) {
				cancelAnimationFrame(animationId.current);
			}
		};
	}, []);

	const initCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const generatePaths = () => {
		paths.current = [];
		const { w, h } = canvasSize.current;

		for (let i = 0; i < pathCount; i++) {
			const path: Path = {
				points: [],
				length: 0,
			};

			// Create curved paths across the screen
			const startY = (h / (pathCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
			const endY = (h / (pathCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
			
			// Generate smooth curve points
			const segments = 50;
			for (let j = 0; j <= segments; j++) {
				const t = j / segments;
				const x = t * w;
				
				// Create wavy paths with some randomness
				const waveFreq = 2 + Math.random() * 2;
				const waveAmp = 30 + Math.random() * 40;
				const baseY = startY + (endY - startY) * t;
				const y = baseY + Math.sin(t * Math.PI * waveFreq) * waveAmp * Math.sin(Math.PI * t);
				
				path.points.push({ x, y });
			}

			// Calculate path length
			let length = 0;
			for (let j = 1; j < path.points.length; j++) {
				const dx = path.points[j].x - path.points[j - 1].x;
				const dy = path.points[j].y - path.points[j - 1].y;
				length += Math.sqrt(dx * dx + dy * dy);
			}
			path.length = length;

			paths.current.push(path);
		}
	};

	const createElectrons = () => {
		electrons.current = [];
		
		paths.current.forEach((_, pathIndex) => {
			// Create 1-3 electrons per path with random starting positions
			const electronCount = 1 + Math.floor(Math.random() * 3);
			for (let i = 0; i < electronCount; i++) {
				electrons.current.push({
					pathIndex,
					progress: Math.random(), // Random starting position
					trail: [],
					speed: electronSpeed * (0.5 + Math.random() * 0.5), // Vary speed slightly
				});
			}
		});
	};

	const getPointOnPath = (pathIndex: number, progress: number): Point => {
		const path = paths.current[pathIndex];
		if (!path || path.points.length === 0) return { x: 0, y: 0 };

		const targetDistance = progress * path.length;
		let currentDistance = 0;

		for (let i = 1; i < path.points.length; i++) {
			const dx = path.points[i].x - path.points[i - 1].x;
			const dy = path.points[i].y - path.points[i - 1].y;
			const segmentLength = Math.sqrt(dx * dx + dy * dy);

			if (currentDistance + segmentLength >= targetDistance) {
				const segmentProgress = (targetDistance - currentDistance) / segmentLength;
				return {
					x: path.points[i - 1].x + dx * segmentProgress,
					y: path.points[i - 1].y + dy * segmentProgress,
				};
			}

			currentDistance += segmentLength;
		}

		return path.points[path.points.length - 1];
	};

	const drawPaths = () => {
		if (!context.current) return;

		context.current.strokeStyle = `rgba(100, 100, 100, 0.2)`;
		context.current.lineWidth = 1;

		paths.current.forEach((path) => {
			context.current!.beginPath();
			path.points.forEach((point, index) => {
				if (index === 0) {
					context.current!.moveTo(point.x, point.y);
				} else {
					context.current!.lineTo(point.x, point.y);
				}
			});
			context.current!.stroke();
		});
	};

	const drawElectrons = () => {
		if (!context.current) return;

		electrons.current.forEach((electron) => {
			const currentPos = getPointOnPath(electron.pathIndex, electron.progress);
			
			// Add current position to trail
			electron.trail.push(currentPos);
			
			// Limit trail length
			if (electron.trail.length > trailLength) {
				electron.trail.shift();
			}

			// Draw trail
			electron.trail.forEach((point, index) => {
				const alpha = (index / electron.trail.length) * brightness;
				const size = (index / electron.trail.length) * 3 + 1;
				
				// Create gradient effect
				const gradient = context.current!.createRadialGradient(
					point.x, point.y, 0,
					point.x, point.y, size * 2
				);
				
				if (index === electron.trail.length - 1) {
					// Brightest at the head
					gradient.addColorStop(0, `rgba(0, 200, 255, ${alpha})`);
					gradient.addColorStop(0.5, `rgba(0, 150, 255, ${alpha * 0.7})`);
					gradient.addColorStop(1, `rgba(0, 100, 255, 0)`);
				} else {
					// Dimmer for the trail
					gradient.addColorStop(0, `rgba(100, 150, 255, ${alpha * 0.6})`);
					gradient.addColorStop(0.5, `rgba(50, 100, 255, ${alpha * 0.4})`);
					gradient.addColorStop(1, `rgba(0, 50, 255, 0)`);
				}

				context.current!.beginPath();
				context.current!.arc(point.x, point.y, size, 0, 2 * Math.PI);
				context.current!.fillStyle = gradient;
				context.current!.fill();
			});

			// Update electron position
			electron.progress += electron.speed / 1000;
			
			// Reset when reaching end
			if (electron.progress >= 1) {
				electron.progress = 0;
				electron.trail = [];
			}
		});
	};

	const animate = () => {
		if (!context.current) return;

		// Clear canvas
		context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
		
		// Draw static paths
		drawPaths();
		
		// Draw moving electrons
		drawElectrons();

		animationId.current = requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}