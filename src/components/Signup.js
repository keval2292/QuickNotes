import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/nodeContext';

const Signup = () => {
    const navigate = useNavigate();
    const { showAlert } = useContext(NoteContext);

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!signup.name || !signup.email || !signup.password || !signup.confirmPassword) {
            setError("Please fill in all fields.");
            showAlert("Please fill in all fields.", 'danger');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signup.email)) {
            setError("Please enter a valid email.");
            showAlert("Please enter a valid email.", 'danger');
            return;
        }

        if (signup.password.length < 5) {
            setError("Password must be at least 5 characters long.");
            showAlert("Password must be at least 5 characters long.", 'danger');
            return;
        }

        if (signup.password !== signup.confirmPassword) {
            setError("Passwords do not match.");
            showAlert("Passwords do not match.", 'danger');
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${host}/api/auth/createnewuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: signup.name,
                    email: signup.email,
                    password: signup.password
                })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || "Signup failed.");
            } else {
                setSignup({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                showAlert("Signup successful! Please log in.", 'success');
                navigate("/login");
            }

        } catch (error) {
            setError(error.message);
            showAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '680px',
                backgroundColor: '#f4f4f4'
            }}
        >
            <div className="card shadow-sm py-3 px-4 mx-1" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="text-center mb-1">
                    <i className="bi bi-person-plus-fill" style={{ fontSize: '40px' }}></i>
                </div>
                <h3 className="text-center mb-3">Signup</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={signup.name}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={signup.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            aria-label="Email address"
                            aria-describedby="basic-addon2"
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={signup.password}
                            onChange={handleChange}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon3"
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon4"><i className="bi bi-key-fill"></i></span>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={signup.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            aria-describedby="basic-addon4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <a href="/login" className="text-dark text-decoration-none">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
