import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Form({
  loader,

  user,
  login,
  password,
  setLogin,
  setPassword,
  setUser,
  setLoader,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && window.location.pathname === "/home") {
      navigate("/cards");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });
      const data = await res.json();
      sessionStorage.setItem("token", data.token);
      if (sessionStorage.getItem("token")) {
        navigate("/cards");
      }
      toast.success("Successfully logged in ");
      setLoader(false);
    } catch (err) {
      toast.warning(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoader(false);
    }

    setLogin("");
    setPassword("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-24 w-80 shadow-xl  rounded-xl mx-auto p-4 bg-slate-500 "
    >
      {" "}
      <ToastContainer />
      {loader && (
        <div className="fixed top-0 left-0 bg-slate-500 w-full h-full">
          <div className="absolute top-[35%] left-[50%] translate-x-[-50%]">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        </div>
      )}
      <h2 className="text-center mb-4 text-4xl text-white">{user}</h2>
      <input
        className="mb-5 mt-2 p-1 outline-none ps-4 rounded-md"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        type="text"
      />
      <input
        className="mb-5 mt-2 p-1 outline-none ps-4 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="pasword"
      />
      <button className="mt-6  rounded-md p-2 bg-green-500 text-white text-lg">
        Yuborish
      </button>
      {user == "Ro'yxatdan O'tish" && (
        <button
          className="mt-4 mb-8 rounded-md bg-blue-500 p-2 text-white text-lg"
          type="button"
          onClick={() => setUser("Login")}
        >
          Login
        </button>
      )}
      {user == "Login" && (
        <button
          className="mt-4 mb-8 rounded-md bg-blue-500 p-2 text-white text-lg"
          type="button"
          onClick={() => setUser("Ro'yxatdan O'tish")}
        >
          Ro'yxatdan O'tish
        </button>
      )}
    </form>
  );
}

export default Form;
