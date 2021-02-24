import Axios from "axios";
import React, { useEffect, useState } from "react";

const NewsPage = () => {
  const [loadedNews, setLoadedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const displayNews = (array) => {
    return array.map((article) => (
      <div className="mx-auto">
        <div
          className="card mt-4"
          style={{
            backgroundColor: "AliceBlue",
            margin: "auto",
            width: "50%",
          }}
        >
          <div className="card-body">
            <img
              src={article.urlToImage}
              className="card-img-top"
              alt={article.title}
              style={{ width: "80%" }}
            />
            <hr />
            <h5 className="card-title mt-4">
              <a href={article.url} target="_blank" rel="noreferrer">
                {article.title}
              </a>
            </h5>
            <p className="card-text">{article.description}</p>
            <p className="card-text">
              <small className="text-muted">{article.publishedAt}</small>
              <br />
              <small className="text-muted">Author: {article.author}</small>
            </p>
          </div>
        </div>
      </div>
    ));
  };

  async function getNews() {
    await Axios.get(
      "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3beb4c78175e4a98a4c2909ce2e6680b"
    ).then((res) => setLoadedNews(res.data.articles));
  }

  useEffect(() => {
    setIsLoading(false);
    getNews();
    const results = loadedNews.filter((n) =>
      n.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = (event) => {
    // debugger;
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const search = (
    <div className="mt-5">
      <form className="">
        <input
          className="form-control form-control-sm"
          placeholder="Search in News"
          onChange={handleChange}
          value={searchTerm}
          type="text"
          name="search-job"
          style={{ width: "20%", margin: "auto" }}
        ></input>
      </form>
    </div>
  );

  return (
    <React.Fragment>
      {search}
      {searchResults.length > 0
        ? displayNews(searchResults)
        : displayNews(loadedNews)}
    </React.Fragment>
  );
};

export default NewsPage;