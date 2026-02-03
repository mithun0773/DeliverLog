import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [store, setStore] = useState("");
  const [deliveryAssociate, setDeliveryAssociate] = useState(""); // ✅ NEW
  const [packages, setPackages] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [driverSignature, setDriverSignature] = useState("");
  const [date] = useState(new Date().toISOString().split("T")[0]);

  return (
    <AppContext.Provider
      value={{
        store,
        setStore,
        deliveryAssociate,
        setDeliveryAssociate,
        packages,
        setPackages,
        driverName,
        setDriverName,
        driverSignature,
        setDriverSignature,
        date,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
