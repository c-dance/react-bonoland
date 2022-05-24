import { createContext } from "react";

const device = {
    device: "browser"
};

export const LayoutContext = createContext(device);