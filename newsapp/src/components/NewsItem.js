import React from "react";

const NewsItem=(props)=>{
    let {title,description,img,newsUrl,author,date,source} = props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning" style={{left:'90%', zIndex:'1'}}>{source.name} </span>
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read More
            </a>
            <p className="card-text"><small className="text-body-secondary text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
