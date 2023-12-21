import { useContext } from "react";
import { StoreContext } from "src/store/provider/index.jsx";
const useStoreContext = () => {
  const context = useContext(StoreContext)
  return context
}

export default useStoreContext