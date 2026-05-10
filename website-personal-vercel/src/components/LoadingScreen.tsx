import { useEffect, useRef, useState } from 'react';

const loadingWords = ['Inspire', 'Build', 'Solve', 'Launch'];
const scrollSensitivity = 0.032;
const touchSensitivity = 0.09;
const keyStep = 8;

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const progressRef = useRef(0);
  const isActiveRef = useRef(true);
  const touchYRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);

  const wordIndex = Math.min(
    loadingWords.length - 1,
    Math.floor((progress / 100) * loadingWords.length),
  );

  useEffect(() => {
    document.documentElement.style.setProperty('--loader-progress', '0');
    document.documentElement.style.setProperty('--loader-y', '0vh');
    document.documentElement.style.setProperty('--loader-content-y', '48px');
    document.documentElement.style.setProperty('--loader-content-opacity', '0.24');
    document.body.classList.add('is-loader-active');

    return () => {
      document.body.classList.remove('is-loader-active');
      document.documentElement.style.removeProperty('--loader-progress');
      document.documentElement.style.removeProperty('--loader-y');
      document.documentElement.style.removeProperty('--loader-content-y');
      document.documentElement.style.removeProperty('--loader-content-opacity');
    };
  }, []);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const setLoaderProgress = (nextProgress: number) => {
      progressRef.current = nextProgress;

      document.documentElement.style.setProperty('--loader-progress', String(nextProgress));
      document.documentElement.style.setProperty('--loader-y', `${nextProgress * -0.42}vh`);
      document.documentElement.style.setProperty(
        '--loader-content-y',
        `${Math.max(0, 48 - nextProgress * 0.48)}px`,
      );
      document.documentElement.style.setProperty(
        '--loader-content-opacity',
        String(Math.max(0.24, nextProgress / 100)),
      );

      setProgress(Math.floor(nextProgress));

      const video = videoRef.current;
      if (video && videoDurationRef.current > 0) {
        video.currentTime = (videoDurationRef.current * nextProgress) / 100;
      }

      if (nextProgress >= 100 && isActiveRef.current) {
        isActiveRef.current = false;
        setIsActive(false);
        document.body.classList.remove('is-loader-active');
        document.documentElement.style.setProperty('--loader-y', '-100vh');
        document.documentElement.style.setProperty('--loader-content-y', '0px');
        document.documentElement.style.setProperty('--loader-content-opacity', '1');
      }
    };

    const updateProgress = (amount: number) => {
      setLoaderProgress(clampProgress(progressRef.current + amount));
    };

    const activateReverseLoader = () => {
      isActiveRef.current = true;
      setIsActive(true);
      document.body.classList.add('is-loader-active');
    };

    const handleWheel = (event: WheelEvent) => {
      const isAtTop = window.scrollY <= 1;

      if (!isActiveRef.current) {
        if (isAtTop && event.deltaY < 0) {
          event.preventDefault();
          activateReverseLoader();
          updateProgress(event.deltaY * scrollSensitivity);
        }

        return;
      }

      event.preventDefault();
      updateProgress(event.deltaY * scrollSensitivity);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;

      if (touchYRef.current === null || currentY === undefined) {
        return;
      }

      const dragAmount = touchYRef.current - currentY;
      const isAtTop = window.scrollY <= 1;

      if (!isActiveRef.current) {
        if (isAtTop && dragAmount < 0) {
          event.preventDefault();
          activateReverseLoader();
          updateProgress(dragAmount * touchSensitivity);
        }

        touchYRef.current = currentY;
        return;
      }

      event.preventDefault();
      updateProgress(dragAmount * touchSensitivity);
      touchYRef.current = currentY;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const isForwardKey = ['ArrowDown', 'PageDown', ' ', 'Enter'].includes(event.key);
      const isBackKey = ['ArrowUp', 'PageUp'].includes(event.key);
      const isAtTop = window.scrollY <= 1;

      if (!isActiveRef.current && isAtTop && isBackKey) {
        event.preventDefault();
        activateReverseLoader();
        updateProgress(-keyStep);
        return;
      }

      if (isActiveRef.current && (isForwardKey || isBackKey)) {
        event.preventDefault();
        updateProgress(isForwardKey ? keyStep : -keyStep);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`site-loader ${isActive ? '' : 'site-loader--inactive'}`}
      role="status"
      aria-label="Scroll to enter portfolio"
      aria-live="polite"
    >
      <video
        ref={videoRef}
        className="site-loader__video"
        src="/loader-animation.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          videoDurationRef.current = event.currentTarget.duration || 0;
          event.currentTarget.currentTime = 0.01;
        }}
      />
      <div className="site-loader__grain" />
      <div className="site-loader__label">Portfolio</div>
      <div className="site-loader__hint">Scroll to enter</div>
      <div className="site-loader__word" key={loadingWords[wordIndex]}>
        {loadingWords[wordIndex]}
      </div>
      <div className="site-loader__counter" aria-hidden="true">
        {String(progress).padStart(3, '0')}
      </div>
    </div>
  );
}
