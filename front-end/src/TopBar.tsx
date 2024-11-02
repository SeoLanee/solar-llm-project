const TopBar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full p-4 shadow-md flex justify-center border-b border-gray-300"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        height: "64px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div className="w-[48rem] flex justify-start">
        <div className="text-xl">SSEOJO</div>
      </div>
    </div>
  );
};

export default TopBar;
