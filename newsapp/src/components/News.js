import React,{useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const apikey = process.env.REACT_APP_KEY;
const News=(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)

  News.defaultProps={
    country:"in",
    pageSize:5,
    category:"general"
  }
  News.propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

    // document.title = props.category.charAt(0).toUpperCase()+props.category.slice(1)
   const updateNews = async()=>{
    props.setProgress(0);
    setLoading(true);
    let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apikey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(10);
    let data =await fetch(Url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(55);
    // setState({articles:parsedData.articles, totalResults:parsedData.totalResults,loading:false})
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(70);
    setLoading(false)
    props.setProgress(100);
   }

   useEffect(() => {
    document.title = props.category.charAt(0).toUpperCase()+props.category.slice(1) + "- NewsOwl"
     updateNews();
     //eslint-disable-next-line
   }, [])
  
  // const handlePreviousClick = async()=>{  
  //     setPage(page-1);
  //     updateNews();
  // }
  // const handleNextClick = async()=>{
  //   setPage(page+1);
  //   updateNews();
  // }
  const fetchMoreData = async()=>{
    let Url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data =await fetch(Url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

    return (
      <>
        <h1 className="text-center" style={{margin:"30px 0px",marginTop:"70px"}}>NewsOwl - Top  {props.category.charAt(0).toUpperCase()+props.category.slice(1)} Headlines</h1>
        {/* {loading  &&<Spinner/> } */}
        <InfiniteScroll 
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
          style={{height: "auto" ,overflow: "hidden"}}
        >
        <div className="container">
        <div className="row">
          {articles.map((e)=>{
              return <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={!e.title?"Title not available":e.title}
                  description={e.description!=null?e.description.slice(0,88):"No description available for this story"}
                  img={e.urlToImage?e.urlToImage:"https://www.hindustantimes.com/ht-img/img/2023/05/02/1600x900/diabetes_skin_symptoms_1683014417596_1683014427173.jpg"}
                  newsUrl={e.url}
                  author={e.author}
                  date={e.publishedAt}
                  source={e.source}
                />
              </div>            
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between"> */}
          {/* <button disabled = {page<=1} type="button" className="btn btn-dark" onClick = {handlePreviousClick}>&larr; Previous</button> */}
          {/* <h6 className="text-center">Page-{page}/{Math.ceil(totalResults/props.pageSize)}</h6> */}
          {/* <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick = {handleNextClick}>Next &rarr;</button> */}
        {/* </div>                 */}
      </>
    )
}

export default News;
