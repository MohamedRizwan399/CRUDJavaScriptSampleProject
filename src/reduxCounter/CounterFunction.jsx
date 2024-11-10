import React, { useEffect }  from 'react';
import { useSelector } from 'react-redux';

const CounterFunction = () => {
    const getApiStoreData = useSelector((state) => state.apiReducer);
    const dataItems = getApiStoreData?.apiData
    

    useEffect(() => {
    }, [])


    return(
        <div className='showApiDataContainer'>
            <h2>This the <span className='get-value-title'>Api Data fetched</span> from Counter Component and shown below using Redux store</h2>
            {dataItems?.map(item => (
                <ul className='showApiData-list' key={item?.id}>
                    <li><h4>{item?.title}</h4></li>
                </ul>
                ))
            }
        </div>
    )

}
export default CounterFunction;