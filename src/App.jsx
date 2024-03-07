import { useCallback, useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8)
  const [allownumber, setAllownumber] = useState(false)
  const [allowchar, setAllowChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)


  const password_genretor = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allownumber) str += "0123456789"
    if (allowchar) str += "~!@#$%^&*_"
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allownumber, allowchar, setPassword]);

  const copy_password = useCallback(() => { 
    passwordRef.current?.select()
    
    window.navigator.clipboard.writeText(password)
    

  },[password])
useEffect(()=>{password_genretor()},[length,allowchar,allownumber,password_genretor])
  return (
    <>
      <h1>Password Gentretor</h1>
      <div className="continer">
        <div className="input">
          <input type="text"  placeholder="Password" readOnly value={password}  />
          <input id="copy_btn" type="button" value="Copy" onClick={copy_password}/>
        </div>

        <div className="dependency">
          <div>
          <input
            type="range"
            id="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="range">Length: {length}</label>
          </div>
          <div>
          <input
          id="numberallow"
            type="checkbox"
            defaultChecked={allownumber}
            onChange={() => {
              setAllownumber((prev) => (!prev));
            }}
          /><label htmlFor="numberallow">Number</label>
          </div>
          
          
          <div>
          <input
          id="charallow"
            type="checkbox"
            defaultChecked={allowchar}
            onChange={() => {
              setAllowChar((prev) => (!prev));
            }}
          /><label htmlFor="charallow">Chareter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
