import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const Register = () => {
  return (
    <main
      className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
      style={{
        backgroundColor: "#fbf9f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <LeftSide mode="register" />
      <RightSide mode="register" />
    </main>
  );
};

export default Register;
