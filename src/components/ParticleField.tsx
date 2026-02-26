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
      value: 50,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    color: {
      value: ["#d4a528", "#b3bfee", "#FFD700"],
    },
    opacity: {
      value: { min: 0.15, max: 0.45 },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2.5 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 180,
      color: "#d4a528",
      opacity: 0.08,
      width: 0.5,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
    },
    shadow: {
      enable: true,
      color: "#FFD700",
      blur: 8,
      offset: { x: 0, y: 0 },
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
        distance: 200,
        links: {
          opacity: 0.4,
          color: "#00D1FF",
        },
      },
      bubble: {
        distance: 200,
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
    <Particles
      id={id}
      className="absolute inset-0 z-0"
      options={PARTICLE_OPTIONS}
    />
  );
}
