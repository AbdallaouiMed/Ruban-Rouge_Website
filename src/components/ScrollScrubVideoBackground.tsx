'use client';

import { useEffect, useRef } from 'react';

type ScrollScrubVideoBackgroundProps = {
  src: string;
  className?: string;
  startAt?: number;
  pixelsPerSecond?: number;
};

export function ScrollScrubVideoBackground({
  src,
  className,
  startAt = 0,
  pixelsPerSecond = 300,
}: ScrollScrubVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    sectionRef.current = video.closest('section');
    const section = sectionRef.current;
    if (!section) return;

    let duration = 0;
    let targetTime = startAt;
    let rafId = 0;
    let sectionStart = 0;
    let scrollRange = 1;
    let ticking = false;
    let maxScrollReached = 0;

    const setDuration = () => {
      const rawDuration = Number.isFinite(video.duration) ? video.duration : 0;
      // Stay within the last decodable frame while still covering full timeline.
      duration = Math.max(startAt, rawDuration - 1 / 60);
      scrollRange = Math.max(1, Math.round(duration * pixelsPerSecond));
      section.style.height = `calc(100vh + ${scrollRange}px)`;
    };

    const recalculateBounds = () => {
      sectionStart = section.getBoundingClientRect().top + window.scrollY;
    };

    const updateTargetFromScroll = () => {
      if (!duration) return;

      const currentScroll = window.scrollY;
      const relativeScroll = currentScroll - sectionStart;
      const rawProgress = relativeScroll / scrollRange;
      const progress = Math.min(1, Math.max(0, rawProgress));

      targetTime = startAt + progress * Math.max(0, duration - startAt);

      // Smooth video scrubbing
      const timeDiff = Math.abs(video.currentTime - targetTime);
      if (timeDiff > 0.016) { // Only update if difference is > 1 frame at 60fps
        video.currentTime = targetTime;
      }

      // Track max scroll reached to allow smooth completion
      maxScrollReached = Math.max(maxScrollReached, relativeScroll);

      // Prevent scrolling past until video is complete (at 99% to allow last frame)
      if (progress < 0.99 && relativeScroll > scrollRange * 0.99) {
        window.scrollTo({
          top: sectionStart + scrollRange * 0.99,
          behavior: 'instant' as ScrollBehavior,
        });
      }
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        updateTargetFromScroll();
        ticking = false;
      });
    };

    video.addEventListener('loadedmetadata', setDuration);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', recalculateBounds);

    video.currentTime = startAt;
    setDuration();
    recalculateBounds();
    updateTargetFromScroll();

    return () => {
      video.removeEventListener('loadedmetadata', setDuration);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', recalculateBounds);
      window.cancelAnimationFrame(rafId);
      section.style.height = '';
    };
  }, [pixelsPerSecond, startAt]);

  return (
    <video
      ref={videoRef}
      className={className ?? 'absolute inset-0 h-full w-full object-cover'}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
