import { Button } from "antd";
import { useAuth } from "../context/AuthContext";

function TestDash() {
  const { authUser } = useAuth();
  console.log(authUser, "useAuth");
  // const logIn = (e) => {
  //   e.preventDefault();
  //   setCheckLogin(true);
  //   setAuthUser({
  //     Name: "Eric",
  //   });
  // };

  // const logOut = (e) => {
  //   e.preventDefault();
  //   setCheckLogin(false);
  //   setAuthUser(null);
  // };
  return (
    <div>
      {/* <span>User current: {checkLogin ? "Login" : "LogOut"}</span> <br />
      {checkLogin ? <span>Hi, {authUser.Name}</span> : <span>Hi, Guest</span>}
      <br />
      <Button onClick={(e) => logOut(e)}>LogOut</Button>
      <Button onClick={(e) => logIn(e)}>LogIn</Button> */}
    </div>
  );
}

export default TestDash;
