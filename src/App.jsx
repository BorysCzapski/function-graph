import { useEffect, useRef } from 'react'
import functionPlot from "function-plot"
import './App.css'

function App() {
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
    <div className="App">

      <div 
        ref={rootRef} 
        style={{ border: '1px solid #ccc', display: 'inline-block' }}
      ></div>
    </div>
  );
}

export default App;