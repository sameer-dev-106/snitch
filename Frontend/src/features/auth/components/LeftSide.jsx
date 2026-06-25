import { useTheme } from "../../../shared/useTheme.jsx";

const leftContent = {
  register: {
    heading: (
      <>
        Define your
        <br />
        <em>aesthetic.</em>
      </>
    ),
    subtext:
      "Join the exclusive movement of creators and brands redefining the modern fashion landscape.",
  },
  login: {
    heading: (
      <>
        Welcome
        <br />
        <em>back.</em>
      </>
    ),
    subtext:
      "Your style journey continues. Sign in to explore new arrivals and manage your wardrobe.",
  },
};

const images = {
  register: {
    light: "/snitch_editorial_warm.png",
    dark: "/snitch_editorial.png",
  },
  login: {
    light: "/snitch_editorial_warm.png",
    dark: "/snitch_editorial.png",
  },
};

const LeftSide = ({ mode = "register" }) => {
  const { theme } = useTheme();
  const src = images[mode][theme];
  const content = leftContent[mode];

  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      style={{ backgroundColor: "#f5f3f0" }}
    >
      <img
        src={src}
        alt="Snitch Fashion Editorial"
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ filter: "brightness(0.97)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 p-14 flex flex-col justify-between z-10">
        <span
          className="text-sm font-medium tracking-[0.35em] uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fefefdeb",
          }}
        >
          Snitch.
        </span>
        <div>
          <p
            className="text-5xl xl:text-6xl font-light leading-[1.08] text-white mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {content.heading}
          </p>
          <p
            className="text-sm font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {content.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
