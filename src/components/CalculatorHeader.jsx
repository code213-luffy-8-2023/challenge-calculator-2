import { useState } from "react";
import "./CalculatorHeader.css";
import { useEffect } from "react";

const themes = ["dark", "light", "contrast"];

const CalculatorHeader = () => {
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    themes.forEach((theme) => {
      if (themes[activeTheme] !== theme) document.body.classList.remove(theme);
      else document.body.classList.add(theme);
    });
  }, [activeTheme]);

  return (
    <header>
      <h1>calc</h1>
      <div className="theme-container">
        <span>Theme</span>
        <div className="toggle-container">
          <div className="toggle-numbers">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="toggle">
            <button
              onClick={() => setActiveTheme(0)}
              className={activeTheme === 0 && "active"}
            ></button>
            <button
              onClick={() => setActiveTheme(1)}
              className={activeTheme === 1 && "active"}
            ></button>
            <button
              onClick={() => setActiveTheme(2)}
              className={activeTheme === 2 && "active"}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CalculatorHeader;
