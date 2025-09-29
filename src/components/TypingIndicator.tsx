import { useEffect, useState } from 'react';

export function TypingIndicator() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getDotScale = (dotIndex: number) => {
    // Create a bouncing effect by scaling dots based on animation phase
    const phase = (animationPhase + dotIndex) % 3;
    return phase === 1 ? 1.2 : 0.8;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '12px'
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '18px 18px 18px 4px',
          backgroundColor: '#E5E5EA',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {[0, 1, 2].map((dotIndex) => (
          <div
            key={dotIndex}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#999',
              transform: `scale(${getDotScale(dotIndex)})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          />
        ))}
      </div>
    </div>
  );
}