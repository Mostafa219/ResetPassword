import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Zod schema for email validation
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address."),
});

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handles changes in the input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    // Validate form data
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // Your API call for the password reset would go here
      // const apiUrl = `${import.meta.env.VITE_API}/auth/customer/reset-password`;
      // await axios.post(apiUrl, result.data);

      console.log("Password reset request for:", result.data.email);
      toast.success(
        "If an account with that email exists, a reset link has been sent."
      );

      // For demonstration, navigate back to sign-in after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error("Reset Password Error:", error.response || error);
      const errorMsg =
        error.response?.data?.error || "An unexpected error occurred.";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Style for displaying error messages
  const errorStyle = {
    color: "#d32f2f",
    fontSize: "0.8rem",
    marginTop: "2px",
    marginBottom: "2px",
  };

  return (
    <div className={styles.authContainer}>
      {/* Image Section */}
      <div className={styles.authImageSection}>
        <img src="/signUp/Dokany.jpg" alt="E-commerce Promotion" />
      </div>

      {/* Form Section */}
      <div className={styles.authFormSection}>
        <div className={styles.formWrapper}>
          <h2>Reset Password</h2>
          <p
            className={styles.switchAuthLink}
            style={{ marginBottom: "2rem", textAlign: "center" }}
          >
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            {apiError && (
              <p
                style={{
                  ...errorStyle,
                  textAlign: "center",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {apiError}
              </p>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <p style={errorStyle}>{errors.email[0]}</p>}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className={styles.switchAuthLink}>
              Remembered your password? <a href="/signin">Back to Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
