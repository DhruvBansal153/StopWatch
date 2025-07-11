import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [start, setStart] = useState<number|null>(null);
  const [now,setNow]=useState<number|null>(null);
  const intervalRef=useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef=useRef<number>(0);

  function handleStart(){
    setStart(Date.now());
    setNow(Date.now());
    timeRef.current=0;

    intervalRef.current=setInterval(()=>{
      setNow(Date.now())
    },10)
    }

    function handlePauseResume(){
      if(intervalRef.current!==null){
        clearInterval(intervalRef.current);
        intervalRef.current=null;
      if(start&&now){
        timeRef.current=timeRef.current + (now - start);
      }
      setStart(null);
    }
      else{
        const current=Date.now();
        setStart(current);
        setNow(current);
        intervalRef.current=setInterval(()=>{
          setNow(Date.now());
        },10);
      }
    }

    function handleReset() {
    clearInterval(intervalRef.current ?? undefined);
    intervalRef.current = null;
    setStart(null);
    setNow(null);
    timeRef.current=0;
    }
    
    let secondsPassed=0;
    if(start && now){
      secondsPassed=(timeRef.current+now-start)/1000;
    }else{
      secondsPassed=timeRef.current/1000;
    }
    
    return(
      <>
      <h1>Time Passed:{secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart} disabled={intervalRef.current !== null || timeRef.current>0}>Start</button>
      <button onClick={handlePauseResume}disabled={start === null && timeRef.current === 0}>
        {intervalRef.current ? 'Pause' : 'Resume'}</button>
      <button onClick={handleReset} disabled={start === null && timeRef.current === 0}>Reset</button>
    </>
  )

}


export default App