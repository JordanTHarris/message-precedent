import { type ISourceOptions } from "@tsparticles/engine";
import { cssHexValue } from "@/lib/utils";

type ParticlesOptionsKeys = "default" | "stars";

export function getParticlesOptions(key: ParticlesOptionsKeys): ISourceOptions {
  const options: ISourceOptions = {
    default: {
      // background: {
      //   color: {
      //     value: cssHexValue("--background"),
      //   },
      // },
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: cssHexValue("--primary"),
        },
        links: {
          color: cssHexValue("--primary"),
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    },
    stars: {
      // background: {
      //   color: {
      //     value: cssHexValue("--background"),
      //   },
      // },
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      particles: {
        color: {
          value: cssHexValue("--primary"),
        },
        number: {
          value: 100,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.1,
          straight: false,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
          value: { min: 0, max: 1 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    },
  };

  return options[key] || {};
}
