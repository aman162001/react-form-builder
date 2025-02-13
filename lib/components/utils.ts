import { defaultFormElements } from "./FormElements";

export const getComponentByType = (type: string) => {
    return defaultFormElements.find((q) => q.type === type)?.component;
  };