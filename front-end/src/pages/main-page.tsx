import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import logo from "@/assets/logo.jpg";

const MainPage = () => {
  const navigator = useNavigate();
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <h1>Welcome To The Best Document Generating AI, AAAA</h1>
      <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <h1>With Korean No.1 LLM Company,</h1>
        <img src={logo} alt="logo" style={{width:100, marginLeft:5}}/>
      </div>
      <h1>You Can Make Any Report What You Want!</h1>
      <Button
      style={{
        width: "120px",
        // height: "50px",
        fontSize: "14px",
        marginTop: "20px",
      }}
      onClick={() => {
        navigator("/chat");
      }}
      >Make Report!</Button>
    </div>
  );
};

export default MainPage;
