import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  const [pass, setPass] = useState();
  const [length, setLength] = useState(8);
  const [checkboxArr, setCheckboxArr] = useState([1]);
  const [str, setStr] = useState("");
  const [strong, setStrong] = useState("Strong Password");

  useEffect(() => {
    checkboxArr.forEach((elem) => {
      document.getElementById(elem).checked = true;
    });
    generateStr();
  }, []);

  const generateStr = (strlength) => {
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var symbols = "!@#$%^&*()";
    var digits = "0123456789";
    var combinedStr = "";
    checkboxArr.forEach((chk) => {
      // console.log(chk);
      switch (chk) {
        case 1:
          combinedStr += letters;
          break;
        case 2:
          combinedStr += digits;
          break;
        case 3:
          combinedStr += symbols;
          break;
        default:
          break;
      }
    });
    setStr(combinedStr);
    resetPass(combinedStr, strlength);
  };

  const resetPass = (combinedStr, strlength) => {
    var genPass = "";
    for (let i = 1; i <= strlength; i++) {
      var char = Math.floor(Math.random() * combinedStr.length + 1);

      genPass += combinedStr.charAt(char);
    }

    setPass(genPass);
  };

  const changeOptions = (e, value) => {
    if (e.target.checked) {
      addArr(value);
      checkboxArr.forEach((elem) => {
        document.getElementById(elem).disabled = false;
      });
    } else {
      if (checkboxArr.length <= 2) {
        removeArr(value);
        checkboxArr.forEach((elem) => {
          document.getElementById(elem).disabled = true;
        });
      } else {
        removeArr(value);
      }
    }
    generateStr(length);
  };

  const removeArr = (value) => {
    for (var i = 0; i < checkboxArr.length; i++) {
      if (checkboxArr[i] === value) {
        checkboxArr.splice(i, 1);
      }
    }
    setCheckboxArr(checkboxArr);
  };

  const addArr = (value) => {
    var Exist = true;
    for (var i = 0; i < checkboxArr.length; i++) {
      if (checkboxArr[i] === value) {
        Exist = false;
      }
    }
    if (Exist) {
      checkboxArr.push(value);
      setCheckboxArr(checkboxArr);
    }
  };

  const changeLength = (e) => {
    console.log(e.target.value);
    setLength(e.target.value);
    if (e.target.value <= 6) {
      setStrong("Weak password");
      document.body.style.backgroundColor = "#d1364e";
    } else if (e.target.value >= 7 && e.target.value <= 8) {
      setStrong("Fairly strong password");
      document.body.style.backgroundColor = "#be4e3a";
    } else {
      setStrong("Strong Password");
      document.body.style.backgroundColor = "#1c815a";
    }
    generateStr(e.target.value);
  };

  const refreshPass = (e) => {
    generateStr(length);
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(pass);
    toast("Copied..");
  };

  return (
    <div className="App">
      <ToastContainer />
      <h2>
        Resist hacks by using <span className="owner">Love's</span> password
        generator tool
      </h2>
      <div className="first-section">
        <div className="password-output">
          <p type="text" name="randomPassword" id="randomPassword">
            {pass}
          </p>
          <i
            className="fa fa-refresh"
            aria-hidden="true"
            onClick={() => refreshPass()}
          ></i>
        </div>
      </div>
      <div className="first-section">
        <div id="div-left">
          <i className="fa fa-shield" aria-hidden="true"></i>
          <label>{strong}</label>
        </div>
        <div id="div-right">
          <button className="copy-btn" onClick={() => copyToClipboard()}>
            Copy Password
          </button>
        </div>
      </div>
      <div className="second-section">
        <label>Length({length})</label>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          className="slider"
          id="lengthSlider"
          onChange={(e) => changeLength(e)}
        />
      </div>
      <div className="first-section">
        <label className="container">
          Letters e.g(A,a)
          <input type="checkbox" id="1" onClick={(e) => changeOptions(e, 1)} />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Digits (e.g. 345)⁭
          <input type="checkbox" id="2" onClick={(e) => changeOptions(e, 2)} />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Symbols (@&$!#?)
          <input type="checkbox" id="3" onClick={(e) => changeOptions(e, 3)} />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}
