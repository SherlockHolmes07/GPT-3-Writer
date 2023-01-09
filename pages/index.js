import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [app, setApp] = useState("Essay");

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, app }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);

    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const getPlaceholer = () => {
    if (app === "Grammer") {
      return `Input any text...`;
    } else {
      return `Title: Artificial intelligence \nDescription: How AI is going to change the world \n`;
    }
  };

  const getSubTitle = () => {
    if (app === "Grammer") {
      return `Input the text and get the grammer & spelling corrected.`;
    } else {
      return `Input the topic and description of essays & get essays as if they were written by George Orwell.`;
    }
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <navbar>
        <div className="navbar-container">
          <button className="btn" onClick={() => setApp("Essay")}>
            Essay Writer
          </button>
          <button className="btn" onClick={() => setApp("Grammer")}>
            Spell Checker
          </button>
        </div>
      </navbar>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get Ready for {app} Nirvana</h1>
          </div>
          <div className="header-subtitle">
            <h2>{getSubTitle()}</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder={getPlaceholer()}
            value={userInput}
            onChange={onUserChangedText}
          />
          ;
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        ></a>
      </div>
      {apiOutput && (
        <div className="output pb-5" style={{ marginBottom: "20px" }}>
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
