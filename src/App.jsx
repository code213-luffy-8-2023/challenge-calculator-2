import { useState } from "react";
import "./App.css";
import CalculatorHeader from "./components/CalculatorHeader";
import { useEffect } from "react";
import { useRef } from "react";

const buttons = [
  {
    text: "7",
    className: "number",
    type: "number",
  },
  {
    text: "8",
    className: "number",
    type: "number",
  },
  {
    text: "9",
    className: "number",
    type: "number",
  },
  {
    text: "del",
    className: "func",
  },
  {
    text: "4",
    className: "number",
    type: "number",
  },
  {
    text: "5",
    className: "number",
    type: "number",
  },
  {
    text: "6",
    className: "number",
    type: "number",
  },
  {
    text: "+",
    className: "number",
    type: "operator",
  },
  {
    text: "1",
    className: "number",
    type: "number",
  },
  {
    text: "2",
    className: "number",
    type: "number",
  },
  {
    text: "3",
    className: "number",
    type: "number",
  },
  {
    text: "-",
    className: "number",
    type: "operator",
  },
  {
    text: ".",
    className: "number",
    type: "number",
  },
  {
    text: "0",
    className: "number",
    type: "number",
  },
  {
    text: "/",
    className: "number",
    type: "operator",
  },

  {
    text: "x",
    className: "number",
    type: "operator",
  },

  {
    text: "reset",
    className: "func",
  },
  {
    text: "=",
    className: "equal",
  },
];

function cal(prescreen, currentScreen, oprator) {
  switch (oprator) {
    case "+":
      return parseFloat(prescreen) + parseFloat(currentScreen);
    case "-":
      return parseFloat(prescreen) - parseFloat(currentScreen);
    case "/":
      return parseFloat(prescreen) / parseFloat(currentScreen);
    case "x":
      return parseFloat(prescreen) * parseFloat(currentScreen);
    default:
      return 0;
  }
}

function App() {
  const [opration, setOperation] = useState(null);
  const [screen, setScreen] = useState("0");
  const [savedScreen, setSavedScreen] = useState("0");
  const [savedOpration, setSavedOpration] = useState(null);

  const buttonsRef = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key;

      if (key == "*") key = "x";
      if (key == "Enter") key = "=";
      if (key == "Backspace") key = "del";
      if (key == "Escape" || key == "Delete") key = "reset";

      const button = buttonsRef.current[key];

      if (button) button.click();
    };
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <CalculatorHeader />
      <div className="screen">{screen}</div>
      <div className="keypad">
        {buttons.map((btn) => {
          return (
            <button
              id="alskdlas"
              ref={(el) => (buttonsRef.current[btn.text] = el)}
              onClick={() => {
                if (btn.type === "number") {
                  if (opration === null) {
                    if (btn.text === "." && screen.includes(".")) return;
                    setScreen(
                      screen === "0"
                        ? btn.text === "."
                          ? "0" + btn.text
                          : btn.text
                        : screen + btn.text
                    );
                  } else {
                    setSavedScreen(screen);
                    setSavedOpration(opration);
                    setScreen(btn.text);
                    setOperation(null);
                  }
                } else if (btn.type === "operator") {
                  if (savedOpration !== null) {
                    const result = cal(savedScreen, screen, savedOpration);
                    setScreen(result + "");
                    setSavedOpration(null);
                  }

                  setOperation(btn.text);
                } else if (btn.text === "del") {
                  if (opration === null) setScreen(screen.slice(0, -1) || "0");
                } else if (btn.text === "reset") {
                  setScreen("0");
                  setSavedScreen("0");
                  setSavedOpration(null);
                  setOperation(null);
                } else if (btn.text === "=") {
                  if (savedOpration !== null) {
                    const result = cal(savedScreen, screen, savedOpration);
                    setScreen(result + "");
                    setSavedOpration(null);
                  }
                }
              }}
              key={btn.text}
              className={btn.className}
            >
              {btn.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
