'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

/**
 * Beautiful animated custom cursor that reacts to next-themes ThemeProvider.
 *
 * - Reads current theme via useTheme() and adapts colors (accent, ring, dot).
 * - Respects prefers-reduced-motion and performance-minded (RAF throttling).
 * - Shows trailing ring + precise inner dot + click ripples + hover interactions.
 *
 * Note:
 * - This is a client component. Keep <ThemeProvider ...> at the root (as you already have).
 * - We wait for the theme hook to mount before rendering so server/client theme mismatch is avoided.
 */

export function CustomCursor() {
  const MIN_WIDTH_PX = 1024;
  const SIZE = 12; // inner dot diameter in px
  const RING_SIZE = 56; // outer ring diameter in px

  // Theme
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid SSR mismatches with theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (resolvedTheme ?? theme) || 'dark';
  const isDark = currentTheme === 'dark';

  // Colors that adapt to theme
  const ringColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'; // subtle fill
  const ringBorderColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.14)';
  const accent = isDark ? '#60a5fa' : '#2563eb'; // blue-ish accent changes with theme
  const dotColor = isDark ? '#fff' : '#0f172a';

  // raw pointer coords (fast updates)
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  // prefer-reduced-motion detection
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // spring-following coords for trailing ring
  const springConfig = { stiffness: 360, damping: 28 };
  const ringX = useSpring(rawX, prefersReducedMotion ? {} : springConfig);
  const ringY = useSpring(rawY, prefersReducedMotion ? {} : springConfig);

  const rafRef = useRef<number | null>(null);
  const latestX = useRef(0);
  const latestY = useRef(0);

  const styleId = 'custom-cursor-hide-style-v3';

  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; createdAt: number }[]
  >([]);

  // inject CSS to hide native cursor when root has .has-custom-cursor
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      /* Hide native cursor when we enable custom cursor.
         Keep cursor for text inputs, textareas, selects and contenteditable regions. */
      .has-custom-cursor * {
        cursor: none !important;
      }
      .has-custom-cursor input,
      .has-custom-cursor textarea,
      .has-custom-cursor select,
      .has-custom-cursor [contenteditable] {
        cursor: auto !important;
      }

      /* helper */
      .custom-cursor-root {
        position: relative;
        z-index: 9999;
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  // Decide whether to enable the custom cursor
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkEnabled = () => {
      const mqPointerFine = window.matchMedia('(pointer: fine)').matches;
      const mqMinWidth = window.matchMedia(`(min-width: ${MIN_WIDTH_PX}px)`).matches;
      const hasTouchPoints = typeof navigator !== 'undefined' && (navigator.maxTouchPoints ?? 0) > 0;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return mqPointerFine && mqMinWidth && !hasTouchPoints && !reduced;
    };

    const mqls = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia(`(min-width: ${MIN_WIDTH_PX}px)`),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ];

    const onChange = () => setEnabled(checkEnabled());

    setEnabled(checkEnabled());

    mqls.forEach((mql) => {
      if (typeof mql.addEventListener === 'function') mql.addEventListener('change', onChange);
      else if (typeof (mql as any).addListener === 'function') (mql as any).addListener(onChange);
    });

    return () => {
      mqls.forEach((mql) => {
        if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', onChange);
        else if (typeof (mql as any).removeListener === 'function') (mql as any).removeListener(onChange);
      });
    };
  }, []);

  // Toggle root class to hide native cursor
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (enabled) root.classList.add('has-custom-cursor');
    else root.classList.remove('has-custom-cursor');

    return () => root.classList.remove('has-custom-cursor');
  }, [enabled]);

  // Mouse move handler (RAF-throttled). Also detects interactive elements.
  useEffect(() => {
    if (!enabled) return;

    const update = () => {
      rawX.set(latestX.current);
      rawY.set(latestY.current);
      rafRef.current = null;
    };

    const onMove = (e: MouseEvent) => {
      latestX.current = e.clientX;
      latestY.current = e.clientY;

      // detect interactives: a, button, input[type=button|submit], [role=button], [data-cursor-interactive]
      const el = (e.target as Element) || null;
      const interactive =
        !!el &&
        !!(el.closest &&
          el.closest(
            'a, button, input[type="button"], input[type="submit"], [role="button"], [data-cursor-interactive]'
          ));
      setIsHoveringInteractive(Boolean(interactive));

      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    const onDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY, createdAt: Date.now() }]);
    };

    const onUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, rawX, rawY]);

  // cleanup old ripples periodically
  useEffect(() => {
    if (ripples.length === 0) return;
    const timeout = setTimeout(() => {
      const now = Date.now();
      setRipples((r) => r.filter((p) => now - p.createdAt < 700));
    }, 200);

    return () => clearTimeout(timeout);
  }, [ripples]);

  // If not enabled or theme not mounted yet, render nothing
  if (!enabled || !mounted) return null;

  // styles for cursor components
  const rootCommon: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="custom-cursor-root"
        style={{
          ...rootCommon,
          width: RING_SIZE,
          height: RING_SIZE,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'block',
        } as any}
        animate={{
          scale: isHoveringInteractive ? 1.35 : isMouseDown ? 0.95 : 1,
          opacity: isHoveringInteractive ? 1 : 0.95,
        }}
        transition={prefersReducedMotion ? { duration: 0.08 } : { type: 'spring', stiffness: 220, damping: 28 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '9999px',
            boxSizing: 'border-box',
            background: isDark
              ? `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.04), ${ringColor})`
              : `radial-gradient(circle at 50% 40%, rgba(15,23,42,0.03), ${ringColor})`,
            border: `1px solid ${ringBorderColor}`,
            boxShadow: isHoveringInteractive
              ? `0 6px 24px ${accent}33, 0 0 40px ${accent}14`
              : isDark
              ? '0 8px 30px rgba(0,0,0,0.12)'
              : '0 8px 30px rgba(2,6,23,0.06)',
            transform: 'translateZ(0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            aria-hidden
            style={{
              width: RING_SIZE * 0.28,
              height: RING_SIZE * 0.28,
              borderRadius: '9999px',
              background: isHoveringInteractive ? accent : 'transparent',
              opacity: isHoveringInteractive ? 0.18 : 0,
              pointerEvents: 'none',
            }}
            animate={{ opacity: isHoveringInteractive ? 0.18 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        style={
          {
            ...rootCommon,
            width: SIZE,
            height: SIZE,
            x: rawX,
            y: rawY,
            translateX: '-50%',
            translateY: '-50%',
            display: 'block',
          } as any
        }
        animate={{
          scale: isHoveringInteractive ? 1.6 : isMouseDown ? 0.85 : 1,
        }}
        transition={prefersReducedMotion ? { duration: 0.04 } : { type: 'spring', stiffness: 600, damping: 40 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '9999px',
            background: dotColor,
            boxShadow: isHoveringInteractive
              ? `0 4px 16px ${accent}26, 0 0 10px ${accent}12`
              : isDark
              ? '0 4px 12px rgba(0,0,0,0.18)'
              : '0 4px 8px rgba(2,6,23,0.08)',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.9, scale: 0 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={
              {
                ...rootCommon,
                left: 0,
                top: 0,
                x: r.x,
                y: r.y,
                translateX: '-50%',
                translateY: '-50%',
                width: RING_SIZE * 0.6,
                height: RING_SIZE * 0.6,
                borderRadius: '9999px',
                background: `${accent}26`,
                pointerEvents: 'none',
              } as any
            }
            onAnimationComplete={() => {
              setRipples((curr) => curr.filter((p) => p.id !== r.id));
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}``