import React, { useEffect } from "react";

const FacebookLoginButton = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

      js.onload = () => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID, // Use your Facebook App ID
            cookie: true,
            xfbml: true,
            version: "v20.0", // Use the latest Facebook Graph API version
          });

          // Check login status after SDK initialization
          window.FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
          });
        };
      };
    })(document, "script", "facebook-jssdk");

    function statusChangeCallback(response) {
      console.log("statusChangeCallback");
      console.log(response);
      if (response.status === "connected") {
        testAPI();
      } else {
        document.getElementById("status").innerHTML =
          "Please log into this webpage.";
      }
    }

    function testAPI() {
      console.log("Welcome! Fetching your information.... ");
      window.FB.api("/me", { fields: "name,email" }, function (response) {
        console.log("Successful login for: " + response.name);
        document.getElementById("status").innerHTML =
          "Thanks for logging in, " + response.name + "!";
      });
    }

    // Cleanup function to avoid potential issues
    return () => {
      window.fbAsyncInit = null;
    };
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information...");
          window.FB.api(
            "/me",
            { fields: "name,email,picture" },
            function (response) {
              console.log("Good to see you, " + response.name + ".");
              console.log("Email:", response.email);
              console.log("Profile Picture:", response.picture.data.url);
              // You can store user information in your app state here
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <>
      <button
        onClick={handleFBLogin}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center mt-5 hover:bg-blue-700"
      >
        Login with Facebook
      </button>
      <div id="status"></div>
    </>
  );
};

export default FacebookLoginButton;
