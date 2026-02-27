import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css';
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

  return (
    <>
      <h1>Kalkulator funkcji liniowych</h1>
      <p>Pamiętaj: ułamki dziesiętne wpisuj z kropkami, nie z przecinkami</p>
        <div className='form-group'>
          <label htmlFor='a-input'>Podaj współczynnik a:</label>
          <input className='form-control' id='a-input' value={aCoefficient} type='number' onChange={(e)=>{setACoefficient(e.target.value)}}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='b-input'>Podaj współczynnik b:</label>
          <input className='form-control' id='b-input' value={bCoefficient} type='number' onChange={(e)=>{setBCoefficient(e.target.value)}}></input>
        </div>
      
      <PropertiesInfoBox>

      </PropertiesInfoBox>
    </>
  )
}

export default App
