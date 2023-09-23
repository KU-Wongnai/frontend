"use client";

import axios from "axios";
import React, { useEffect } from "react";

// This page is used to handle the callback from Google OAuth
const GoogleAuthPage = () => {
  useEffect(() => {
    // Retrive code, scope, prompt from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const scope = urlParams.get("scope");
    const prompt = urlParams.get("prompt");

    // If code, scope, prompt are present, then sent request to /auth/google/callback
    if (code && scope && prompt) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_USER_API_URL}api/auth/google/callback?code=${code}&scope=${scope}&prompt=${prompt}`
        )
        .then((res) => {
          // Save the JWT token to localStorage
          localStorage.setItem("token", res.data.access_token);
          // Redirect to home page
          window.location.href = "/";
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Redirecting...</div>;
};

export default GoogleAuthPage;
