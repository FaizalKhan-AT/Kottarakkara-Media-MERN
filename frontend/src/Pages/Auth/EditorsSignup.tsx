import React from "react";
import Signup from "../../Components/Authentication/Signup";
import cover from "../../assets/Logo/coverimg.jpg";
const EditorsSignup = () => {
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div>
          <div className="text-center h4 my-2 mt-3">
            Are you a enthusiastic reporter ? <br />
            Join us
          </div>
          <div
            style={{
              textDecoration: "dotted underline var(--red-color)",
              textTransform: "none",
            }}
            className="fs-5 text-center fw-bold"
          >
            Steps to become an editor at kottarakara media
          </div>
          <ul className="mt-2">
            <li>Register using this form</li>
            <li>Login to your editor's panel</li>
            <li>
              Post your news the news will be unpublished at first and will be
              held for review.
            </li>
            <li>
              Your news will be approved by the admin if its genuine and will be
              published
            </li>
          </ul>
        </div>
        <Signup external name="Sign up" />
      </div>
    </>
  );
};

export default EditorsSignup;
