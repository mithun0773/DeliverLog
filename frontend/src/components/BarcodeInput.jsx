import { useEffect, useRef } from "react";

const BarcodeInput = ({ value, setValue }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Scan or enter package ID"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default BarcodeInput;
