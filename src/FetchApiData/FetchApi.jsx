import React ,{useEffect, useState} from 'react'
import axios from 'axios'

function FetchApi() {
    const [data, setData] = useState([])

    const fetchData = () => {
        console.log("Button clicked")
        //sample get api
        axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=6004b8fcb1604003b4ead57854e8d2c2")
        .then((response) => {
            console.log(response);
            setData(response.data.articles)

        })
    }

    useEffect(() => {  
        document.body.style.backgroundColor = 'silver';
        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    return (
        <>
            <div className="btn-fetchContainer">
                <button className='btn-fetch' onClick={fetchData}>Click here to Fetch Api Data!!</button>
            </div>

            <div className="ui-fetched">
                {
                    data.map((value, index) => {
                        const imageUrl = value?.urlToImage
                        console.log("imageUrl--",imageUrl)
                        return(
                            <div className='card' style={{width: "20rem"}} key={index}>
                                <img src={value?.urlToImage} className="card-img-top" width={300} alt={value?.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">{value?.title}</h5>
                                    <p className="card-desc">{value?.description}</p><br></br>
                                    Want to Read more, <a href={value?.url || "/notfound"} className="btn-primary"> <span style={{fontWeight: "bold"}}>Click here</span></a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default FetchApi