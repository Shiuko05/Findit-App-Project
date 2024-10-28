import React, { createContext, useContext, useRef, useCallback } from "react";
import BottomSheetView, {
  BottomSheetMethods,
} from "../components/BottomSheetView";

const BottomSheetContext = createContext(null);

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef < BottomSheetMethods > null;

  const expandHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeHandler = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{ expandHandler, closeHandler, bottomSheetRef }}
    >
      {children}
      <BottomSheetView ref={bottomSheetRef} snapTo={"50%"} /> {/* Aquí */}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};
