import React from "react";
import Counter from "../reduxCounter/Counter";
import CounterFunction from "../reduxCounter/CounterFunction";

class Demo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age:"",
            isApiFunctionCompLoaded: true,
        }
    }

    inputchange(e, param) {
        this.setState({
            [param]:e.target.value
        })
    }

    componentDidMount() {
        this.state.isApiFunctionCompLoaded && this.setState({isApiFunctionCompLoaded: false});
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const {name, age, isApiFunctionCompLoaded} = this.state;
        return (
            <div className="othertask-container">
                <div className="instantChange-container">
                    Enter your Name: <input type="text" onChange={e => this.inputchange(e, "name")} />
                    Enter your Age: <input type="number" onChange={e => this.inputchange(e, "age")} />

                    <h1>Name: {name}<br/> Your Age: {age}</h1>
                </div>
                    {/* This is Counter ClassComponent to do increment/decrement operation*/}
                    <hr className="headerline1" style={{ borderTop: "1px solid lightgrey" }}></hr>
                    <Counter isApiCalled={isApiFunctionCompLoaded}/>
                    

                    {/* This is Counter functional Component to show Api data fetched from Counter component */}
                    <hr className="headerline2" style={{ borderTop: "1px solid lightgrey" }}></hr>
                    <CounterFunction/>

            </div>
        )
    }
}

export default Demo;