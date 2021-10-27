import { useEffect } from "react";
import { useRef } from "react";

export const useHasChanged = (val) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
