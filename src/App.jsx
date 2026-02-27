import { useState, useRef, useEffect } from 'react' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css';
import functionPlot from "function-plot"
import './App.css'

function App() {
  const [aCoefficient, setACoefficient] = useState(1);
  const [bCoefficient, setBCoefficient] = useState(0);
  const rootRef = useRef(null);

  function PropertiesInfoBox() {
    let root, monotonity;
    if (aCoefficient === 0) {
      monotonity = "stała";
      root = bCoefficient === 0 ? "nieskończenie wiele" : "brak";
    } else {
      monotonity = aCoefficient > 0 ? "rosnąca" : "malejąca";
      root = (-bCoefficient / aCoefficient).toFixed(2);
    }

    return (
      <div className="alert alert-info mt-3">
        <p><b>Wzór:</b> y = {aCoefficient}x + {bCoefficient}</p>
        <p><b>Miejsce zerowe:</b> {root}</p>
        <p><b>Punkt przecięcia z OY:</b> (0, {bCoefficient})</p>
        <p><b>Monotoniczność:</b> {monotonity}</p>
      </div>
    );
  }

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.innerHTML = ""; 

    try {
      functionPlot({
        target: rootRef.current, 
        width: 600,
        height: 400,
        grid: true,
        xAxis: { domain: [-10, 10] },
        yAxis: { domain: [-10, 10] },
        tip: {
          xLine: true,
          yLine: true,
          renderer: function (x, y) {
            return `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
          }
        },
        data: [
          {
            fn: `${aCoefficient} * x + ${bCoefficient}`, 
            color: 'red',
          }
        ]
      });
    } catch (e) {
      console.error("Błąd rysowania:", e);
    }
  }, [aCoefficient, bCoefficient]); 

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Analizator Funkcji Liniowej</h1>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Parametry</h5>
            <label className="form-label">Współczynnik a: {aCoefficient}</label>
            <input 
              type="range" className="form-range" 
              min="-10" max="10" step="0.5"
              value={aCoefficient} 
              onChange={(e) => setACoefficient(parseFloat(e.target.value))} 
            />
            
            <label className="form-label mt-2">Współczynnik b: {bCoefficient}</label>
            <input 
              type="range" className="form-range" 
              min="-10" max="10" step="0.5"
              value={bCoefficient} 
              onChange={(e) => setBCoefficient(parseFloat(e.target.value))} 
            />
            
            <PropertiesInfoBox />
          </div>
        </div>

        <div className="col-md-8 text-center">
          <div 
            ref={rootRef} 
            style={{ border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default App;