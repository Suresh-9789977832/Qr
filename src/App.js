import axios from "axios";
import { ChromePicker } from 'react-color';
import { useEffect, useState } from "react";
import Header from "./Components/Header";
// import Field from "./Components/Field";

function App() {
  const [state, setstate] = useState({
    data: "",
    width: "",
    height: "",
    format: "",
    color: "",
    bg: "",
    
    
  })
  
  const [color, setcolor] = useState('#C41F1F')
  const [backgroundcolor,setbackgroundcolor]=useState('#C41F1F')
  const [display, setdisplay] = useState(false)
  const [displaybackground, setdisplaybackground] = useState(false)
  const [save, setsave] = useState([])
 

  useEffect(() => {

    let data = backgroundcolor.split("#").join('')
    let data1=color.split('#').join('')
    

    setstate({ ...state,color:data1 })
    setstate({...state,bg:data})
  }, [backgroundcolor,color])

  
  const handlechange =color => {
          setcolor(color.hex)
  }
  const handlebackground = backgroundcolor   => {
    setbackgroundcolor(backgroundcolor.hex)
   
  }

  const handledata = (e) => {
    let name = e.target.name
    let value = e.target.value

        setstate({...state, [name]:value})
  }

    
console.log(state)

   
  const finalsave = () => {
    
    async function getdata() {
      let res = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?&size${state.width}x${state.height}&data=${state.data}&format=${state.format}&bgcolor=${state.bg} `)
      setsave(res.config.url)
    }
    getdata()
  }
  
  console.log(color)
  console.log(backgroundcolor)
  // console.log(obj)

  return (
    <div className="app">
      <Header />
      <div className="content">
      <div className='field_outer'>
            <div className='field_inner'> 
                <div className='field_first'>
                <label style={{paddingBottom:"5px",fontSize:"25px"}}>Enter the data</label>
                <input type='text' name="data" placeholder="Enter the data" onChange={handledata} className="inputfirst"/>
                </div>

                <div className='field_second'>
                    <div className='field_width'>
                        <label>Width</label>
                        <input type='number' placeholder='Enter the width' name="width" onChange={handledata} className="inputsecond"/>
                    </div>
                    <div className='field_height'>
                        <label>Height</label>
                        <input type='number' placeholder='Enter the height' name="height" onChange={handledata} className="inputsecond"/>
                    </div>
                </div>

                <div className='field_third'>
              <label style={{ paddingBottom: "8px" }}>Qr Color &nbsp;</label>
              <div onClick={() => setdisplay(!display)} style={{ background: color }} className='smallbox'></div>
              {display && (<ChromePicker onChange={handlechange} color={color}/>)}

            </div><br/>

            <div className='field_fourth'>
              <label style={{ paddingBottom:"8px" }}>Background Color &nbsp;</label>
              <div onClick={() => setdisplaybackground(!displaybackground)} style={{ background: backgroundcolor }} className='smallbox'></div>
              {displaybackground && (<ChromePicker onChange={handlebackground} backgroundcolor={backgroundcolor}/>)}

            </div><br/>

            <div className="field_fifth" >
              <label style={{ paddingBottom:"8px"}}>Format &nbsp;</label>
              <select name="format" onChange={handledata} style={{ marginBottom:"8px" }}>
                <option value={'jpg'}>JPG</option>
                <option value={'png'}>PNG</option>
                <option value={'svg'}>SVG</option>
                </select>
            </div>

            <div className="field_six">
                  <button className="six" onClick={finalsave}>click me</button>
            </div>
            </div>
        </div>

        <div className="qrcode">
          {<img src={save} />}
       
        </div>
      </div>
    </div>
  );
}

export default App;
