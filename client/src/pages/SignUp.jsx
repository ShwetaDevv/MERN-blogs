import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email";
  };

  const handleGitHubSignUp = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email";
  };

  return (
    <div className="bg-blue-900 gap-24 h-full w-full ">
      <div className="min-h-screen flex items-center justify-start bg-blue-100 dark:bg-blue-900">
        {/* Left Section */}
        <div className="flex-1 bg-blue-100 dark:bg-blue-900 p-5 flex flex-col justify-center items-center">
          <h1 className="mt-5 text-2xl font-serif font-bold text-center text-gray-800 dark:text-white">
            LESS TAKING MORE BUILDING
          </h1>
          <div className="p-7 flex-1">
            <img
              src="https://test-redis.pantheonsite.io/wp-content/uploads/2024/07/tryfree.webp?&amp;auto=webp&amp;quality=90,75&amp;width=500"
              alt="Demo"
              className="w-full max-w-lg mx-auto"
            />
          </div>

          <p className="text-sm mt-5 font-medium text-center text-gray-800 dark:text-white">
            This is a demo project. You can sign up with your email and password
            or with Google/GitHub.
          </p>
        </div>

        <div className="flex-1 max-w-md p-5 m-9 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ">
          <div className="bg-white dark:bg-gray-800 p-8 flex-1 rounded-lg shadow-md">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <h1 className="text-center font-bold text-xl">
                Get started for free
              </h1>
              <p className="antialiased">
                Sign-up with your Google or GitHub account
              </p>

              <div className="flex gap-4 mt-5 justify-center">
                <Button
                  color="google"
                  onClick={handleGoogleSignUp}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
                >
                  <FaGoogle className="mr-2" />
                  Google
                </Button>
                <Button
                  color="github"
                  onClick={handleGitHubSignUp}
                  className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </Button>
              </div>

              <div className="flex items-center justify-center mt-4">
                <div className="border-t border-gray-300 w-1/3"></div>
                <p className="mx-2 bg-white dark:bg-gray-800">Or</p>
                <div className="border-t border-gray-300 w-1/3"></div>
              </div>

              <div>
                <Label value="Your username" className="text-gray-800 dark:text-white" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label value="Your email" className="text-gray-800 dark:text-white" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label value="Your password" className="text-gray-800 dark:text-white" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="flex gap-2 text-sm mt-5">
              <span className="text-gray-800 dark:text-white">Have an account?</span>
              <Link to="/sign-in" className="text-blue-500 dark:text-blue-400">
                Sign In
              </Link>
            </div>

            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
