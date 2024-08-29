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
    })(document, "script", "facebook-jssdk");

    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_APP_ID", // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v18.0", // Use the latest Facebook Graph API version
      });
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
              // You can also store the user information in your app state here
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" } // Request the required permissions
    );
  };

  return (
    <button
      onClick={handleFBLogin}
      className="bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center mt-5 hover:bg-blue-700"
    >
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;
