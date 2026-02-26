"use client";

import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const PARTICLE_OPTIONS: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 45,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    color: {
      value: ["#FFD700", "#b3bfee", "#d4a528"],
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.2,
        sync: false,
      },
    },
    size: {
      value: { min: 0.8, max: 2.8 },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 160,
      color: "#d4a528",
      opacity: 0.06,
      width: 0.4,
    },
    move: {
      enable: true,
      speed: 0.15,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: ["grab", "bubble"],
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.45,
          color: "#00D1FF",
        },
      },
      bubble: {
        distance: 180,
        size: 5,
        duration: 0.4,
        opacity: 0.8,
        color: "#00D1FF",
      },
      push: {
        quantity: 2,
      },
    },
  },
};

let engineInitialized = false;

interface ParticleFieldProps {
  id?: string;
}

export default function ParticleField({ id = "stellar-resonance" }: ParticleFieldProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (engineInitialized) {
      setReady(true);
      return;
    }
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineInitialized = true;
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <>
      <Particles
        id={id}
        className="absolute inset-0 z-0"
        options={PARTICLE_OPTIONS}
      />
      {/* Soft blur glow layer for neon nebula effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ filter: "blur(4px)", mixBlendMode: "screen", opacity: 0.15 }}
      >
        <Particles
          id={`${id}-glow`}
          options={{
            ...PARTICLE_OPTIONS,
            particles: {
              ...PARTICLE_OPTIONS.particles,
              number: { value: 15 },
              size: { value: { min: 2, max: 5 } },
              opacity: { value: { min: 0.1, max: 0.3 } },
              links: { enable: false },
              color: { value: "#00D1FF" },
            },
            interactivity: { events: {} },
          }}
        />
      </div>
    </>
  );
}
