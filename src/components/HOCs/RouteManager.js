import React from "react";
import { Navigate } from "react-router-dom";
import { Utils } from "../../app/utils";

function RouteManager({ path, Component, isProtected = false }) {
  const isAdmin = Utils.isAdmin();

  if (isProtected) {
    return !isAdmin ? <Navigate to="/" /> : <Component />;
  }
  return <Component />;
}

export default RouteManager;
