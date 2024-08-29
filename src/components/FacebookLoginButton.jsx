import React, { useEffect } from "react";

const FacebookLoginComponent = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

      js.onload = function () {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: "435589545512206", // Replace with your App ID
            cookie: true,
            xfbml: true,
            version: "v20.0",
          });

          window.FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
          });
        };
      };
    })(document, "script", "facebook-jssdk");

    const statusChangeCallback = (response) => {
      console.log("statusChangeCallback");
      console.log(response);
      if (response.status === "connected") {
        testAPI();
      }
    };

    const testAPI = () => {
      console.log("Fetching your information.... ");
      window.FB.api("/me", { fields: "name,email" }, function (response) {
        console.log("Successful login for: " + response.name);
        // Handle the response as needed
      });
    };
  }, []);

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        statusChangeCallback(response);
      },
      { scope: "public_profile,email" }
    );
  };

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      testAPI();
    }
  };

  const testAPI = () => {
    console.log("Fetching your information.... ");
    window.FB.api("/me", { fields: "name,email" }, function (response) {
      console.log("Successful login for: " + response.name);
      // Handle the response as needed
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookLoginComponent;
