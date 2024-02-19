import "../styles/global.css";
import { UserDataProvider } from "../context/context/userContext";

export default function App({ Component, pageProps }) {
  return (
    
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    
  );
}
