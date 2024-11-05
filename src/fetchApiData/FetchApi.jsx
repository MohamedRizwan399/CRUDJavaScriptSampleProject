import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader';

function FetchApi() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        //sample get api
        try {
            setIsLoading(true);
            await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=6004b8fcb1604003b4ead57854e8d2c2")
            .then((response) => {
                setData(response?.data?.articles);
            })
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!isLoading) document.body.style.backgroundColor = 'silver';
        return () => {
            document.body.style.backgroundColor = '';
        }
    }, [isLoading]);

    const showToast = () => {
        toast.info("Data Already Fetched!!")
    }

    return (
        <>
            <div className="btn-fetchContainer">
                <button className='btn-fetch' onClick={data.length > 0 ? showToast : fetchData}>Click here to Fetch Api Data!!</button>
            </div>

            <div className="ui-fetched">
                {
                    data.map((value, index) => {
                        const imageUrl = value?.urlToImage;
                        return(
                                <div className='card' style={{width: "20rem"}} key={index}>
                                    <img src={(imageUrl && imageUrl !== null) ? imageUrl : "favicon1.ico"} className="card-img-top" width={300} alt={value?.title}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{value?.title}</h5>
                                        <p className="card-desc">{value?.description}</p><br></br>
                                        Want to Read more, <a href={value?.url || "/notfound"} target='_blank' rel='noopener noreferrer' className="btn-primary"> <span style={{fontWeight: "bold"}}>Click here</span></a>
                                    </div>
                                </div>
                        );
                    })
                }
            </div>

            {/* Loader */}
            {isLoading && <div className="loader" style={{backgroundColor: "none"}}>
                <ClipLoader color="#09f" loading={isLoading} size={50} /></div>
            }
        </>
    )
}

export default FetchApi