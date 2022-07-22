import { Link } from "react-router-dom";

const SignPage = () => {
  return (
    <main className="flex flex-col justify-center w-screen h-screen align-middle">
      <form className="flex flex-col max-w-xl max-h-60">
        <label htmlFor="name">Email</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <button onClick={() => console.log("Clicked")}>Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up</Link>
    </main>
  );
};

export default SignPage;
