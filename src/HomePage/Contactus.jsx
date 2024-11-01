import { Component } from 'react';
import Aboutus from './Aboutus';

class Contactus extends Component{
    render(){
  return (
    <div>
        <h2 className='contactus'>The below details are used from AboutUs Page!!!</h2><br></br>
        <Aboutus />

    </div>
  );
    }
}
export default Contactus;