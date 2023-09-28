import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material";

import useSettings from "src/hooks/useSettings";

// ----------------------------------------------------------------------

const AuthLayout = () => {
  const theme = useTheme();
  const { themeColor } = useSettings();

  useEffect(() => {
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 64,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: theme.palette.primary.main,
        },
        shape: {
          type: "circle",
          stroke: {
            width: 1,
            color: "#000000",
          },
          polygon: {
            nb_sides: 4,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: theme.palette.primary.main,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "bounce",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }, [themeColor]);

  return (
    <>
      <div
        id="particles-js"
        style={{
          position: "fixed",
          top: 0,
          left: 0,

          zIndex: 1,

          width: "100vw",
          height: "100vh",
        }}
      ></div>

      <Outlet />
    </>
  );
};

export default AuthLayout;
