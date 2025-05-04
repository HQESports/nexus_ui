"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Image, Group } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { MAP_IMAGES } from '@/lib/constants';

// Define types
interface Position {
  x: number;
  y: number;
}

interface BaseCanvasProps {
  mapName: string;
  minZoom: number;
  maxZoom: number;
  canvasSize: number;
  children: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function BaseCanvas({
  mapName,
  minZoom,
  maxZoom,
  canvasSize,
  children,
  onKeyDown,
}: BaseCanvasProps) {
  // Constants for min/max zoom
  const MIN_ZOOM = minZoom;  // Minimum zoom is 1x (no zooming out)
  const MAX_ZOOM = maxZoom;  // Maximum zoom is 5x


  const [scale, setScale] = useState<number>(MIN_ZOOM);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<any>(null);
  const isDragging = useRef<boolean>(false);
  const lastPosition = useRef<Position>({ x: 0, y: 0 });

  const CANVAS_SIZE = canvasSize;

  // Load background image
  useEffect(() => {
    const MAP_IMG_URL = MAP_IMAGES[mapName] || '/maps/Erangel_Main_No_Text_Low_Res.png';
    const image = new window.Image();
    image.src = MAP_IMG_URL; // Replace with your image URL
    image.onload = () => {
      setBackgroundImage(image);
    };
  }, [mapName]);

  // Helper function to constrain position within bounds
  const constrainPosition = (pos: Position, scale: number): Position => {
    // Calculate the boundaries beyond which we shouldn't be able to pan
    const minX = Math.min(0, CANVAS_SIZE - CANVAS_SIZE * scale);
    const maxX = Math.max(0, CANVAS_SIZE - CANVAS_SIZE * scale);
    const minY = Math.min(0, CANVAS_SIZE - CANVAS_SIZE * scale);
    const maxY = Math.max(0, CANVAS_SIZE - CANVAS_SIZE * scale);

    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y)),
    };
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>): void => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = scale;
    const pointer = stage.getPointerPosition() as Vector2d;

    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };

    // Calculate new scale
    const newScale = e.evt.deltaY < 0 ? oldScale * 1.1 : oldScale / 1.1;

    // Limit zoom level between MIN_ZOOM and MAX_ZOOM
    const limitedScale = Math.max(MIN_ZOOM, Math.min(newScale, MAX_ZOOM));

    // If the scale didn't change (already at min/max), don't update position
    if (limitedScale === oldScale) return;

    // Update position based on zoom
    const newPos = {
      x: pointer.x - mousePointTo.x * limitedScale,
      y: pointer.y - mousePointTo.y * limitedScale,
    };

    // Constrain the position within bounds
    const constrainedPos = constrainPosition(newPos, limitedScale);

    setScale(limitedScale);
    setPosition(constrainedPos);
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>): void => {
    isDragging.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition() as Vector2d;
    lastPosition.current = pos;
    e.evt.preventDefault();
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>): void => {
    if (!isDragging.current) return;
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition() as Vector2d;
    const dx = pos.x - lastPosition.current.x;
    const dy = pos.y - lastPosition.current.y;

    const newPos = {
      x: position.x + dx,
      y: position.y + dy,
    };

    // Constrain the position within bounds
    const constrainedPos = constrainPosition(newPos, scale);

    setPosition(constrainedPos);
    lastPosition.current = pos;
  };

  const handleDragEnd = (): void => {
    isDragging.current = false;
  };

  return (

    <div className='rounded-lg border-2 overflow-hidden'>
      <Stage
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        ref={stageRef}
        style={{ border: '1px solid black' }}
        onKeyDown={onKeyDown}
      >
        <Layer>
          {/* Background image */}
          {backgroundImage && (
            <Image
              x={0}
              y={0}
              image={backgroundImage}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
            />
          )}
          <Group>
            {children}
          </Group>

        </Layer>
      </Stage>
    </div >
  );
};