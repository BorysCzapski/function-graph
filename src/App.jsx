import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css';
import functionPlot from "function-plot"
import './App.css'

function App() {
  const [aCoefficient, setACoefficient] = useState(0)
  const [bCoefficient, setBCoefficient] = useState(0)
  function PropertiesInfoBox(){
      let root, monotonity;
      if (aCoefficient == 0) {
        monotonity = "stała";
        if(bCoefficient == 0){
          root = "nieskończenie wiele";
        }
        else{
          root = "brak";
        }
      }
      else{
        if (aCoefficient > 0) {
          monotonity = "rosnąca";
        }
        else{
          monotonity = "malejąca";
        }
        root = -bCoefficient/aCoefficient;
      }
      return(
        <div>
          <p>Miejsce zerowe: {root}</p>
          <p>Punkt przecięcia z OY: (0, {bCoefficient})</p>
          <p>Monotoniczność: {monotonity}</p>
        </div>
      )
    
  }

  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.innerHTML = ""; 
    }

    try {
      functionPlot({
        //config
        target: rootRef.current, 
        width: 800,
        height: 500,
        grid: true,
        yAxis: { domain: [-5, 8] },
        tip: { //dymek nad funkcją
          xLine: true,
          yLine: true,
          //render
          renderer: function (x, y) {
            return `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
          }
        },
        data: [
          {
            fn: '3 * x ^2+ 2', // tu sie dodaje wzor funkcji
            color: 'red', // kolor funkcji
            range: [-100, 100],  //zasięg
          }
        ]
      });
    } catch (e) {
      console.error("Błąd podczas rysowania wykresu:", e);
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div 
        ref={rootRef} 
        style={{ border: '1px solid #ccc', display: 'inline-block' }}
      ></div>
    </>
    
  )
}

export default App;