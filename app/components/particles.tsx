// "use client";

// import React, { useRef, useEffect, useState } from "react";

// interface ElectronFlowProps {
// 	className?: string;
// 	pathCount?: number;
// 	electronSpeed?: number;
// 	trailLength?: number;
// 	brightness?: number;
// }

// export default function ElectronFlow({
// 	className = "",
// 	pathCount = 5,
// 	electronSpeed = 2,
// 	trailLength = 40,
// 	brightness = 0.8,
// }: ElectronFlowProps) {
// 	const canvasRef = useRef<HTMLCanvasElement>(null);
// 	const canvasContainerRef = useRef<HTMLDivElement>(null);
// 	const context = useRef<CanvasRenderingContext2D | null>(null);
// 	const paths = useRef<Path[]>([]);
// 	const electrons = useRef<Electron[]>([]);
// 	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
// 	const animationId = useRef<number>();
// 	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

// 	type Point = {
// 		x: number;
// 		y: number;
// 	};

// 	type Path = {
// 		points: Point[];
// 		length: number;
// 	};

// 	type Electron = {
// 		pathIndex: number;
// 		progress: number; // 0 to 1 along the path
// 		trail: Point[];
// 		speed: number;
// 	};

// 	useEffect(() => {
// 		if (canvasRef.current) {
// 			context.current = canvasRef.current.getContext("2d");
// 		}
// 		initCanvas();
// 		generatePaths();
// 		createElectrons();
// 		animate();

// 		const handleResize = () => {
// 			initCanvas();
// 			generatePaths();
// 			createElectrons();
// 		};

// 		window.addEventListener("resize", handleResize);

// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 			if (animationId.current) {
// 				cancelAnimationFrame(animationId.current);
// 			}
// 		};
// 	}, []);

// 	const initCanvas = () => {
// 		if (canvasContainerRef.current && canvasRef.current && context.current) {
// 			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
// 			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
// 			canvasRef.current.width = canvasSize.current.w * dpr;
// 			canvasRef.current.height = canvasSize.current.h * dpr;
// 			canvasRef.current.style.width = `${canvasSize.current.w}px`;
// 			canvasRef.current.style.height = `${canvasSize.current.h}px`;
// 			context.current.scale(dpr, dpr);
// 		}
// 	};

// 	const generatePaths = () => {
// 		paths.current = [];
// 		const { w, h } = canvasSize.current;

// 		for (let i = 0; i < pathCount; i++) {
// 			const path: Path = {
// 				points: [],
// 				length: 0,
// 			};

// 			// Create curved paths across the screen (back to original style)
// 			const startY = (h / (pathCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
// 			const endY = (h / (pathCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
			
// 			// Generate smooth curve points
// 			const segments = 50;
// 			for (let j = 0; j <= segments; j++) {
// 				const t = j / segments;
// 				const x = t * w;
				
// 				// Create wavy paths with some randomness
// 				const waveFreq = 2 + Math.random() * 2;
// 				const waveAmp = 30 + Math.random() * 40;
// 				const baseY = startY + (endY - startY) * t;
// 				const y = baseY + Math.sin(t * Math.PI * waveFreq) * waveAmp * Math.sin(Math.PI * t);
				
// 				path.points.push({ x, y });
// 			}

// 			// Calculate path length
// 			let length = 0;
// 			for (let j = 1; j < path.points.length; j++) {
// 				const dx = path.points[j].x - path.points[j - 1].x;
// 				const dy = path.points[j].y - path.points[j - 1].y;
// 				length += Math.sqrt(dx * dx + dy * dy);
// 			}
// 			path.length = length;

// 			paths.current.push(path);
// 		}
// 	};

// 	const createElectrons = () => {
// 		electrons.current = [];
		
// 		paths.current.forEach((_, pathIndex) => {
// 			// Create 1-3 electrons per path with random starting positions
// 			const electronCount = 1 + Math.floor(Math.random() * 3);
// 			for (let i = 0; i < electronCount; i++) {
// 				electrons.current.push({
// 					pathIndex,
// 					progress: Math.random(), // Random starting position
// 					trail: [],
// 					speed: electronSpeed * (0.5 + Math.random() * 0.5), // Vary speed slightly
// 				});
// 			}
// 		});
// 	};

// 	const getPointOnPath = (pathIndex: number, progress: number): Point => {
// 		const path = paths.current[pathIndex];
// 		if (!path || path.points.length === 0) return { x: 0, y: 0 };

// 		const targetDistance = progress * path.length;
// 		let currentDistance = 0;

// 		for (let i = 1; i < path.points.length; i++) {
// 			const dx = path.points[i].x - path.points[i - 1].x;
// 			const dy = path.points[i].y - path.points[i - 1].y;
// 			const segmentLength = Math.sqrt(dx * dx + dy * dy);

// 			if (currentDistance + segmentLength >= targetDistance) {
// 				const segmentProgress = (targetDistance - currentDistance) / segmentLength;
// 				return {
// 					x: path.points[i - 1].x + dx * segmentProgress,
// 					y: path.points[i - 1].y + dy * segmentProgress,
// 				};
// 			}

// 			currentDistance += segmentLength;
// 		}

// 		return path.points[path.points.length - 1];
// 	};

// 	const drawPaths = () => {
// 		if (!context.current) return;

// 		context.current.strokeStyle = `rgba(100, 100, 100, 0.2)`;
// 		context.current.lineWidth = 1;

// 		paths.current.forEach((path) => {
// 			context.current!.beginPath();
// 			path.points.forEach((point, index) => {
// 				if (index === 0) {
// 					context.current!.moveTo(point.x, point.y);
// 				} else {
// 					context.current!.lineTo(point.x, point.y);
// 				}
// 			});
// 			context.current!.stroke();
// 		});
// 	};

// 	const drawElectrons = () => {
// 		if (!context.current) return;

// 		electrons.current.forEach((electron) => {
// 			const currentPos = getPointOnPath(electron.pathIndex, electron.progress);
			
// 			// Add current position to trail
// 			electron.trail.push(currentPos);
			
// 			// Limit trail length
// 			if (electron.trail.length > trailLength) {
// 				electron.trail.shift();
// 			}

// 			// Draw trail as straight line segments with dimming effect
// 			if (electron.trail.length > 1) {
// 				for (let i = 0; i < electron.trail.length - 1; i++) {
// 					const alpha = (i / electron.trail.length) * brightness;
// 					const lineWidth = (i / electron.trail.length) * 2 + 0.5;
					
// 					context.current!.strokeStyle = `rgba(0, 150, 255, ${alpha * 0.6})`;
// 					context.current!.lineWidth = lineWidth;
// 					context.current!.beginPath();
// 					context.current!.moveTo(electron.trail[i].x, electron.trail[i].y);
// 					context.current!.lineTo(electron.trail[i + 1].x, electron.trail[i + 1].y);
// 					context.current!.stroke();
// 				}
// 			}

// 			// Draw main electron as a bright circle
// 			const electronRadius = 4;
// 			context.current!.beginPath();
// 			context.current!.arc(currentPos.x, currentPos.y, electronRadius, 0, 2 * Math.PI);
// 			context.current!.fillStyle = `rgba(0, 200, 255, ${brightness})`;
// 			context.current!.fill();
			
// 			// Add a bright glow around the main electron
// 			context.current!.beginPath();
// 			context.current!.arc(currentPos.x, currentPos.y, electronRadius * 1.5, 0, 2 * Math.PI);
// 			context.current!.fillStyle = `rgba(100, 220, 255, ${brightness * 0.3})`;
// 			context.current!.fill();

// 			// Update electron position
// 			electron.progress += electron.speed / 1000;
			
// 			// Reset when reaching end
// 			if (electron.progress >= 1) {
// 				electron.progress = 0;
// 				electron.trail = [];
// 			}
// 		});
// 	};

// 	const animate = () => {
// 		if (!context.current) return;

// 		// Clear canvas
// 		context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
		
// 		// Draw static paths
// 		drawPaths();
		
// 		// Draw moving electrons
// 		drawElectrons();

// 		animationId.current = requestAnimationFrame(animate);
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
	quantity?: number;
	speed?: number;
	fontSize?: number;
	opacity?: number;
}

export default function Particles({
	className = "",
	quantity = 80,
	speed = 1,
	fontSize = 14,
	opacity = 0.6,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const drops = useRef<Drop[]>([]);
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const animationId = useRef<number>();
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	type Drop = {
		x: number;
		y: number;
		speed: number;
		char: string;
		opacity: number;
		trail: { char: string; y: number; opacity: number }[];
	};

	const binaryChars = ['0', '1'];

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		createDrops();
		animate();

		const handleResize = () => {
			initCanvas();
			createDrops();
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
			
			// Set font for binary characters
			context.current.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', 'Courier New', monospace`;
			context.current.textAlign = "center";
		}
	};

	const createDrops = () => {
		drops.current = [];
		const { w, h } = canvasSize.current;
		const columnWidth = fontSize * 1.2;
		const columns = Math.floor(w / columnWidth);

		for (let i = 0; i < Math.min(quantity, columns); i++) {
			const x = (i * columnWidth) + (columnWidth / 2);
			drops.current.push({
				x: x,
				y: Math.random() * -h, // Start above screen
				speed: (0.5 + Math.random() * 1.5) * speed,
				char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
				opacity: 0.8 + Math.random() * 0.2,
				trail: [],
			});
		}
	};

	const updateDrop = (drop: Drop) => {
		const { h } = canvasSize.current;
		
		// Move drop down
		drop.y += drop.speed;
		
		// Occasionally change the character
		if (Math.random() < 0.02) {
			drop.char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
		}
		
		// Add to trail every few pixels
		if (drop.y % (fontSize * 0.8) < drop.speed) {
			drop.trail.push({
				char: drop.char,
				y: drop.y,
				opacity: drop.opacity,
			});
		}
		
		// Fade trail
		drop.trail = drop.trail.map(trailChar => ({
			...trailChar,
			opacity: trailChar.opacity * 0.95,
		})).filter(trailChar => trailChar.opacity > 0.05);
		
		// Reset when off screen
		if (drop.y > h + fontSize) {
			drop.y = Math.random() * -h - fontSize;
			drop.speed = (0.5 + Math.random() * 1.5) * speed;
			drop.opacity = 0.8 + Math.random() * 0.2;
			drop.trail = [];
		}
	};

	const drawDrop = (drop: Drop) => {
		if (!context.current) return;
		
		// Draw trail (dimmer characters behind)
		drop.trail.forEach((trailChar) => {
			const alpha = trailChar.opacity * opacity * 0.4;
			context.current!.fillStyle = `rgba(0, 255, 100, ${alpha})`;
			context.current!.fillText(trailChar.char, drop.x, trailChar.y);
		});
		
		// Draw main character (brightest)
		const alpha = drop.opacity * opacity;
		context.current.fillStyle = `rgba(0, 255, 150, ${alpha})`;
		context.current.fillText(drop.char, drop.x, drop.y);
		
		// Add slight glow effect for the leading character
		context.current.fillStyle = `rgba(150, 255, 200, ${alpha * 0.3})`;
		context.current.fillText(drop.char, drop.x, drop.y);
	};

	const animate = () => {
		if (!context.current) return;

		// Clear canvas with slight fade effect for smoother trails
		context.current.fillStyle = 'rgba(0, 0, 0, 0.05)';
		context.current.fillRect(0, 0, canvasSize.current.w, canvasSize.current.h);
		
		// Update and draw all drops
		drops.current.forEach((drop) => {
			updateDrop(drop);
			drawDrop(drop);
		});

		animationId.current = requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}