import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import styles from "./styles/login.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login, isLoggingIn } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please fill out all fields"); // Replace with toast or inline error message
            return;
        }

        
        login(formData).then(() => {
            navigate("/admin"); // Navigate to the homepage
        }).catch((err) => {
            console.error("Login failed:", err);
        });
        

    }

    return (
        <div className={styles.page_container}>
            <div className={styles.form_container}>
                <div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className={styles.email_container}>
                        <label>
                            <span>
                                <Mail /> <span>Email</span>
                            </span>
                        </label>
                        <div>
                            <input
                                type="email"
                                className={styles.email_input}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className={styles.password_container}>
                        <label>
                            <span>
                                <Lock /> Password
                            </span>
                        </label>
                        <div className={styles.password_wrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <button
                                type="button"
                                className={styles.show_password_button}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        aria-busy={isLoggingIn}
                        className={styles.submit_button}
                    >
                        {isLoggingIn ? (
                            <>
                                <Loader2 />
                                Loading...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                
            </div>

            <div className={styles.image_container}>
                {/* Add an image or illustration here */}
            </div>
        </div>
    );
}
