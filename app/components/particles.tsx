"use client";

import React, { useRef, useEffect, useState } from "react";

interface ElectronFlowProps {
	className?: string;
	pathCount?: number;
	electronSpeed?: number;
	trailLength?: number;
	brightness?: number;
}

export default function ElectronFlow({
	className = "",
	pathCount = 5,
	electronSpeed = 2,
	trailLength = 40,
	brightness = 0.8,
}: ElectronFlowProps) {
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

			const pathType = Math.random();
			
			if (pathType < 0.6) {
				// Horizontal paths with turns (60%)
				const direction = Math.random(); // 0-1 for left-to-right or right-to-left
				const startSide = Math.random(); // Which side to start from
				
				let startX, startY, endX;
				
				if (startSide < 0.33) {
					// Start from left
					startX = -50;
					endX = w + 50;
				} else if (startSide < 0.66) {
					// Start from right
					startX = w + 50;
					endX = -50;
				} else {
					// Start from top
					startX = Math.random() * w;
					endX = Math.random() * w;
				}
				
				if (startSide < 0.66) {
					startY = h * 0.2 + Math.random() * h * 0.6;
				} else {
					startY = -50;
				}
				
				const turnCount = 1 + Math.floor(Math.random() * 4);
				const segmentLength = Math.abs(endX - startX) / (turnCount + 1);
				
				let currentX = startX;
				let currentY = startY;
				path.points.push({ x: currentX, y: currentY });
				
				for (let turn = 0; turn < turnCount; turn++) {
					// Straight segment
					const segmentVar = segmentLength + (Math.random() - 0.5) * segmentLength * 0.4;
					currentX += startX < endX ? segmentVar : -segmentVar;
					path.points.push({ x: currentX, y: currentY });
					
					// Turn (if not the last segment)
					if (turn < turnCount - 1) {
						const turnDirection = Math.random() < 0.5 ? 1 : -1;
						const turnAmount = 30 + Math.random() * 80;
						currentY += turnDirection * turnAmount;
						currentY = Math.max(0, Math.min(h, currentY)); // Keep in bounds
						path.points.push({ x: currentX, y: currentY });
					}
				}
				
				// Final segment
				if (startSide < 0.66) {
					path.points.push({ x: endX, y: currentY });
				} else {
					path.points.push({ x: currentX, y: h + 50 });
				}
				
			} else {
				// L-shaped paths (40%)
				const startSide = Math.random();
				let startX, startY, endX, endY;
				
				if (startSide < 0.25) {
					// Start from left
					startX = -30;
					startY = h * 0.2 + Math.random() * h * 0.6;
					endX = w * 0.3 + Math.random() * w * 0.4;
					endY = h * 0.2 + Math.random() * h * 0.6;
				} else if (startSide < 0.5) {
					// Start from right
					startX = w + 30;
					startY = h * 0.2 + Math.random() * h * 0.6;
					endX = w * 0.3 + Math.random() * w * 0.4;
					endY = h * 0.2 + Math.random() * h * 0.6;
				} else if (startSide < 0.75) {
					// Start from top
					startX = w * 0.2 + Math.random() * w * 0.6;
					startY = -30;
					endX = w * 0.2 + Math.random() * w * 0.6;
					endY = h * 0.3 + Math.random() * h * 0.4;
				} else {
					// Start from bottom
					startX = w * 0.2 + Math.random() * w * 0.6;
					startY = h + 30;
					endX = w * 0.2 + Math.random() * w * 0.6;
					endY = h * 0.3 + Math.random() * h * 0.4;
				}
				
				path.points.push({ x: startX, y: startY });
				
				// Add corner point - randomize the turn direction
				const cornerChoice = Math.random();
				if (cornerChoice < 0.5) {
					path.points.push({ x: endX, y: startY });
					path.points.push({ x: endX, y: endY });
				} else {
					path.points.push({ x: startX, y: endY });
					path.points.push({ x: endX, y: endY });
				}
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