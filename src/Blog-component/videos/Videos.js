import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from '../VideoList/VideoList';
import { useHistory} from 'react-router-dom';

    function Videos ()  {
        const history = useHistory();
        const path = window.location.pathname;
        const [pageNumber, setPageNumber] = useState(0);
        const [videos, setVideos] = useState([]);
        const [numberOfPages, setNumberOfPage] = useState(0);

        useEffect(() => {
            const getPages = () => {
                axios.get(`https://api.thetijanidisciples.com/video/videos?page=${pageNumber}`)
                    .then(res =>res.data)
                    .then(({totalPages, files}) => {
                        setVideos(files);
                        setNumberOfPage(totalPages);
                    })
            };
            getPages();
            history.push(`${path}?page=${pageNumber + 1}`)
            
        },[pageNumber, history, path])
        const prevHandler = (e) => {
            e.preventDefault();
            setPageNumber(Math.max(0, pageNumber-1))
            window.scrollTo(0,0);
          }
        const nextHandler = (e) => {
            e.preventDefault();
            setPageNumber(Math.min(numberOfPages-1, pageNumber + 1));
            window.scrollTo(0,0);
          }
      const renderList = () => {
        return videos.map(video =>{
            return (
                <VideoList  video = {video} key= {video._id} />
            )
        })
    }
        return (
            <div>
                <div className="header-title">
                    <section className="hero is-medium has-text-centered">
	                    <div className="hero-body">
		                    <div className="container">
                                <h2 className="title is-2">Videos</h2>
		                        
		                    </div>
	                    </div>
	                </section>
	            </div>
                <div className="main-content">
                    <div className="container">
                        <div className="columns is-centered is-multiline has-text-centered">
	                        <div className="column is-6">
                                <div className = "post">
                                    {renderList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                {pageNumber === 0 && numberOfPages > 1 && <nav className= "has-text-right">
                    <button onClick= {nextHandler} className="pagination-next">Next Posts</button>
                    </nav>
                }
                {pageNumber >= 1 && pageNumber < numberOfPages-1 && <nav className="has-text-right">
	                <button onClick={prevHandler} className="pagination-previous" >Previous Posts</button>
	                <button onClick= {nextHandler} className="pagination-next">Next Posts</button>
	            </nav>
                }
                {pageNumber === numberOfPages-1 && numberOfPages > 1 && <nav className= "has-text-right">
                <button onClick={prevHandler} className="pagination-previous" >Previous Posts</button>
                </nav>
                } 
                </div>
            </div>
        )
    }

    export default Videos