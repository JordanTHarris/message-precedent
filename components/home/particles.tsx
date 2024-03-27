"use client";

import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { getParticlesOptions } from "@/lib/particle-options";

export default function ParticlesComponent({
  className,
}: {
  className?: string;
}) {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options = useMemo(
    // () => getParticlesOptions(theme === "dark" ? "stars" : "default"),
    () => getParticlesOptions("default"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme], // force re-render on theme changes
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      className={className}
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
}
