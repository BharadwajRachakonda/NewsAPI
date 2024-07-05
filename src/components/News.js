import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [url, setUrl] = useState(
    "https://newsapi.org/v2/top-headlines?language=en&apiKey=89ba88e142584c9d8b14e2912cf70c1d&pageSize=20&page=1"
  );
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://newsapi.org/v2/everything?language=en&apiKey=89ba88e142584c9d8b14e2912cf70c1d&pageSize=20";
  const topHeadlinesUrl = "https://newsapi.org/v2/top-headlines?language=en&apiKey=89ba88e142584c9d8b14e2912cf70c1d&pageSize=20&page=1";

  useEffect(() => {
    fetchNews(url);
  }, [url]);

  const fetchNews = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const filteredArticles = data.articles.filter(
        (article) =>
          article.description != null &&
          article.description.length >= 88 &&
          article.title.length >= 30
      );
      setArticles(filteredArticles);
      setLength(data.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    let newUrl = searchText ? `${baseUrl}&q=${searchText}&page=1` : topHeadlinesUrl;
    setUrl(newUrl);
    setPage(1);
  };

  const handleNextClick = () => {
    if (length > page * 20 && page < 4) {
      setPage((prevPage) => prevPage + 1);
      let newUrl = `${url.split("&page=")[0]}&page=${page + 1}`;
      setUrl(newUrl);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      let newUrl = `${url.split("&page=")[0]}&page=${page - 1}`;
      setUrl(newUrl);
    }
  };

  return (
    <div className="container-sm">
      <div className="d-flex">
        <h1>Daily News</h1>
        {loading && <Loading />}
      </div>
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center mb-3">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search - (Click on Search after Entering or Deleting Text)"
          aria-label="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <br />
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePreviousClick}
          disabled={page <= 1}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
          disabled={
            Math.floor(length / 20) <= page || page >= 4
          }
        >
          Next &rarr;
        </button>
      </div>
      <br />
      <br />
      {!loading && (
        <div className="d-flex flex-row justify-content-between gap-3 flex-wrap">
          {articles.map((article, index) => (
            <NewsItem
              title={article.title.slice(0, 30)}
              description={article.description.slice(0, 88)}
              image={article.urlToImage}
              url={article.url}
              key={index}
              time={article.publishedAt}
            />
          ))}
        </div>
      )}
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePreviousClick}
          disabled={page <= 1}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
          disabled={
            Math.floor(length / 20) <= page || page >= 4
          }
        >
          Next &rarr;
        </button>
      </div>
      <br />
    </div>
  );
};

export default News;
