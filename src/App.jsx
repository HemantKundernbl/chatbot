import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
import UserContext from "./components/Context";
import { useEffect, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState(true); // language true will set it to English
  const [queryParams, setQueryParam] = useState({});

  const handleLanguage = () => {
    setLanguage(!language);
  };

  const fetchQueryParams = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    const type = searchParams.get("type");
    const filing_type = searchParams.get("filing_type");
    const status = searchParams.get("status");
    const lang = searchParams.get("lang");

    const paramsObject = {
      type,
      filing_type,
      status,
      lang,
    };

    setQueryParam({
      ...paramsObject,
    });
  };
  useEffect(() => {
    fetchQueryParams();
  }, []);
  console.log(queryParams);

  return (
    <div className="App">
      <Header handleLanguage={handleLanguage} language={language} />
      <ChatBox queryParams={queryParams} />
    </div>
  );
}
