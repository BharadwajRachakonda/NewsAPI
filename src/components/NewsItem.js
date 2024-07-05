import React from "react";

const defaultImage =
  "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const NewsItem = (props) => {
    let { title, description, image, url, time } = props;
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
        <div className="card" style={{ height: "100%" }}>
          <img
            src={image || defaultImage}
            className="card-img-top"
            alt={title + "..."}
            style={{ objectFit: "cover", height: "200px" }}
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop if default image also fails
              e.target.src = defaultImage;
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title + "..."}</h5>
            <p className="card-text">{description + "..."}</p>
            <a
              href={url}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
            <p className="card-text">{new Date(time).toUTCString()}</p>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
