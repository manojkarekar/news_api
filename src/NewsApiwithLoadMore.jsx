import React, { useState, useEffect } from "react";
import "./NewsApi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const NewsApiWithLoadMore = () => {
    const [apiData, setApiData] = useState([]);
    const [zone, setZone] = useState("india");
    const [articlesToShow, setArticlesToShow] = useState(20);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const api_key = "dcada234e81447a29180b187c98ce73c";
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const fetchNews = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=publishedAt&apiKey=${api_key}`);
            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }
            const data = await response.json();
            setApiData(data.articles || []);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load news articles.");
            setApiData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(zone);
    }, []);

    const searchNewsHandler = async (event) => {
        event.preventDefault();
        fetchNews(zone);
        setArticlesToShow(20);
    };

    const loadMoreHandler = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + 20);
    };

    return (
        <>
            <div id="forms">
                <h1>TheNews</h1>
                <form onSubmit={searchNewsHandler} className="form" id="Form">
                    <input
                        type="text"
                        value={zone}
                        className="zone"
                        onChange={(e) => setZone(e.target.value)}
                        placeholder="Enter a city or topic"
                    />
                    <button type="submit" className="ibtn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
                <button id="LR">Login</button>
            </div>

            <section className="content">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    apiData.slice(0, articlesToShow).map((data) => (
                        data.urlToImage && (
                            <div className="data" key={data.url}>
                                <h4 className="title">{data.title}</h4>
                                <img src={data.urlToImage} height="200px" alt="" className="Img" />
                                <p className="Description">{data.description}</p>
                                <a href={data.url} target="_parent" rel="noopener noreferrer">
                                    <button className="ReadMore">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </a>
                            </div>
                        )
                    ))
                )}
            </section>

            {articlesToShow < apiData.length && !error && !loading && (
                <button onClick={loadMoreHandler} className="LM">
                    <FontAwesomeIcon icon={faCirclePlus} />
                </button>
            )}
            <br /><br />
        </>
    );
};
