import React ,{Component} from 'react';
import {connect} from 'react-redux';
import { store } from '../ReduxStore/store';
import axios from 'axios'
import { storeApiDataAction, updateCounterAction } from '../ReduxStore/Actions/Action';
import "../App.css"

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterValue: 0
        }
    }

    componentDidMount() {
        //sample get api
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>{
            const responseData = response?.data
            const filteredItems = responseData.filter((item) => item?.userId === 2);
            store.dispatch(storeApiDataAction(filteredItems));
            //this.props.apiDataAction(filteredItems)
        })
        
    }

    triggerAction = (param) => {
        let actionType = "", updatedValue = 0;
        if (param === "increment") {
            actionType = "COUNTER-INCREMENT";
            updatedValue = this.state.counterValue + 1;
        } else {
            actionType = "COUNTER-DECREMENT";
            updatedValue = this.state.counterValue - 1;
        }
        this.setState(
            {counterValue: updatedValue},
            () => {
                this.props.counterAction(actionType, this.state.counterValue);
            }
        )

        
         
    };

    render() {
        const { updatedValue = null } = this.props.counterReducerData
        return(
            <div className='counter-container'>
                <h2>This is the <span className='get-value-title'>Increment/Decrement</span> operation to update state and stored in ReduxStore</h2>
                <div className='counter-value'>Counter value:   {this.state.counterValue}</div>
                <button className='btn-inc' onClick={()=>this.triggerAction("increment")}>
                Increment
                </button><br/>
                <button onClick={()=>this.triggerAction("decrement")}>
                Decrement
                </button><br/>

                <div className='get-value'><span className='get-value-title'>Get Value From Redux store:</span>  {updatedValue}</div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        counterReducerData: state.counterReducer
    }
}

const mapDispatchToProps = {
    counterAction: updateCounterAction,
    apiDataAction: storeApiDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

