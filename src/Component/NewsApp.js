import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

 const category =[
"business",
 "entertainment",
 "general",
 "health",
 "science",
 "sports",
 "technology"
 ]
const Newsapp=()=>{
    const [articles,setArticles]=useState([]);
    const[totalArticles,setTotalArticles] = useState(0);
    const[currentPage,setCurrentPage]=useState(undefined);
    const[categorys,setCategorys]=useState("general");


    const loadNews=(pageNo = 1) =>{
        axios({
            url:"https://newsapi.org/v2/top-headlines",
            method:"GET",
            params:{
                country:"in",
                apiKey:"315d1ee615d1437aa042ba81bce0f359",
                category:categorys,
                page:pageNo
            }

        }).then((res) =>{
            setArticles([...articles,...res.data.articles])
            setTotalArticles(res.data.totalResults)
            setCurrentPage(pageNo)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{loadNews()},[])
    useEffect(()=>{
        loadNews()
    },[categorys])

    return(
        <>
            <div>
               <h1>News Application</h1>
               <div>
                {
                    category.map((category)=>{
                        return(
                            <button className="btn btn-primary" style={{margin:20}} onClick={()=>{
                                setArticles([])
                                setCategorys(category)
                            }}>{category}</button>
                        )
                    })
                }
               </div>
             
                <InfiniteScroll
                    style={{display:'flex', flexWrap:'wrap'}}
                    dataLength={articles.length}
                    next = {() =>{
                              loadNews(currentPage+1);
                    }}
                     hasMore= {totalArticles != articles.length}
                >
                        {
                            articles.map((articles,index) =>{
                                return(
                                    <div className="card" style={{width: 200 ,margin:20}}>
                                        <img className="card-img-top" src={articles.urlToImage} alt="Card image cap" style={{width:'100%',height:150}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{articles.title}</h5>
                                            <p className="card-text">{articles.description}</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Newsapp;