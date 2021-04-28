import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const Context: React.FC = ({ children }) => <Router>{children}</Router>;
