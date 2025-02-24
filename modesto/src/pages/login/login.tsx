import { useState } from "react";
import { login, signup } from "../../services/auth";
import './app.css'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle form field changes
  function handleInputChange(e:any){
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  async function handleSubmit(e:any) {
    e.preventDefault(); 
    setError(""); 


    if (isLogin) {
      const response = await login(formData.email, formData.password);
      if (response) {
        localStorage.setItem("authToken", response);
        console.log("TESTE")
        navigate('/home'); 
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      const response = await signup({email: formData.email, name:formData.username, password:formData.password});
    }
  };

  function handleFormSwitch(){
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }); 
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Username field (only for signup) */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Confirm password field (only for signup) */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleFormSwitch}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
}
