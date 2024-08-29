import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import "./App.css"; // Import Tailwind CSS styles

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
      } else {
        // Handle the case when user is not logged in
      }
    };

    const testAPI = () => {
      console.log("Fetching your information.... ");
      window.FB.api("/me", { fields: "name,email" }, function (response) {
        console.log("Successful login for: " + response.name);
        // You can set the state here to display user info
      });
    };
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    if (response.status === "connected") {
      // User is logged in
      testAPI(response);
    } else {
      // User is not logged in
    }
  };

  const testAPI = (response) => {
    console.log("Fetching your information.... ");
    window.FB.api("/me", { fields: "name,email" }, function (response) {
      console.log("Successful login for: " + response.name);
      // You can set the state here to display user info
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <FacebookLogin
        appId="YOUR_APP_ID" // Replace with your App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="bg-blue-500 text-white p-2 rounded"
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookLoginComponent;
