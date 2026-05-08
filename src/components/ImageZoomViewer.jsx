import React, { useState, useRef, useEffect } from "react";

export default function ImageZoomViewer({
  src,
  alt,
  className = "",
  fit = "contain",
}) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;
  const ZOOM_STEP = 0.2;

  // Handle mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta));
    setZoom(newZoom);
  };

  // Handle pinch zoom on touch devices
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setDragStart((prev) => ({ ...prev, distance }));
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      if (dragStart.distance) {
        const delta = distance - dragStart.distance;
        const newZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, zoom + delta * 0.01),
        );
        setZoom(newZoom);
        setDragStart((prev) => ({ ...prev, distance }));
      }
    } else if (isDragging && zoom > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  // Reset on new image (or when swapping variant photos)
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  }, [src]);

  // Handle mouse drag to pan
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Constrain position when zoomed
  useEffect(() => {
    if (containerRef.current && imageRef.current && zoom > 1) {
      const container = containerRef.current;
      const image = imageRef.current;
      const maxX = (image.offsetWidth * zoom - container.offsetWidth) / 2;
      const maxY = (image.offsetHeight * zoom - container.offsetHeight) / 2;

      const nextX = Math.max(-maxX, Math.min(maxX, position.x));
      const nextY = Math.max(-maxY, Math.min(maxY, position.y));
      if (nextX !== position.x || nextY !== position.y) {
        setPosition({ x: nextX, y: nextY });
      }
    }
  }, [zoom, position.x, position.y]);

  const objectFitClass =
    fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Image Container */}
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${isDragging ? "cursor-grabbing" : zoom > 1 ? "cursor-grab" : "cursor-default"} ${className}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`w-full h-full ${objectFitClass} transition-transform duration-200 select-none`}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: "center",
          }}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&h=800&fit=crop";
          }}
        />
      </div>
    </div>
  );
}
