
import React from 'react';
import { cn } from "@/lib/utils";

interface BlurContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

const BlurContainer = ({
  children,
  intensity = 'medium',
  className,
  ...props
}: BlurContainerProps) => {
  const blurIntensity = {
    light: 'backdrop-blur-sm bg-white/60',
    medium: 'backdrop-blur-md bg-white/70',
    strong: 'backdrop-blur-lg bg-white/80',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 shadow-sm',
        blurIntensity[intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
