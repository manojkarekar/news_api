import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import "./NewsApi.css"



export const NewsApi = () => {

    const [ApiData, SetData] = useState([])

    const [Zone, setZone] = useState("india")
    const api_key = "dcada234e81447a29180b187c98ce73c"
    const today = new Date();
    let date = today.getDate();


    // const SearchNewsHandler = async (event) => {
    //     event.preventDefault();
    //     const news = await fetch(`https://newsapi.org/v2/everything?q=${Zone}&from=${date}&sortBy=publishedAt&apiKey=${api_key}&units=metric`)
    //     const data = await news.json();
    //     SetData(data.articles);


    //     console.log(ApiData);
    //     console.log(Zone)
    // }

    const fetchNews = async (query) => {
        const news = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=publishedAt&apiKey=${api_key}&units=metric`);
        const data = await news.json();
        SetData(data.articles);
    };

    // Fetch default news when component mounts
    useEffect(() => {
        fetchNews(Zone);
    }, []);

    // Handle form submission
    const SearchNewsHandler = async (event) => {
        event.preventDefault();
        fetchNews(Zone);
    };


    return (
        <>



<div id="forms">

                <h1>TheNews</h1>
            <form onSubmit={SearchNewsHandler} action="" className='form' id="Form">
                <div className="IB">

                <input
                    type="text"
                    value={Zone}
                    className='zone'
                    onChange={(e) => setZone(e.target.value)}
                    placeholder=""
                    />
                <button type="submit" className='ibtn'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

            </form>
                    <button id="LR">Login</button>
                    </div>

            
            <section className="content">
                {ApiData.map((data, index) => (
                    data.urlToImage && (
                        <div className="data" key={index}>
                            <h4 className="title">{data.title}</h4>
                            <img src={data.urlToImage} height={"200px"} alt="" className="Img" />
                            <p className="Description">{data.description}</p>
                            <a href={data.url} target="_blank" rel="noopener noreferrer">
                                <button className="ReadMore">Read More</button>
                            </a>
                        </div>
                    )
                ))}
            </section>




        </>
    )
}

