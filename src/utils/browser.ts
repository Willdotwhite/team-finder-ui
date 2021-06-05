import Bowser from "bowser";
import * as React from "react";

const browser = Bowser.getParser(window.navigator.userAgent);

export const isDesktop = browser.getPlatformType(true) === "desktop";
