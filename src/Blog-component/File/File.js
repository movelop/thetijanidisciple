import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'



function File () {
    const history = useHistory();
    const path = window.location.pathname;
    const [pageNumber, setPageNumber] = useState(0);
     const [files, setFiles] = useState([]);
     const [numberOfPages, setNumberOfPage] = useState(0);
     

     useEffect(()=>{
         const getPost = () =>{
            axios.get(`https://api.thetijanidisciples.com/file/files?page=${pageNumber}`
        )
        .then(res =>res.data)
        .then(({totalPages, files}) => {
            setFiles(files);
            setNumberOfPage(totalPages);
        })
         };
         getPost();
        history.push(`${path}?page=${pageNumber + 1}`)
    }, [pageNumber, history, path])

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
    const renderDate = (dateString) =>{
        const nameMonths = ['January',"February", "March","April",
        "May","June","July", "August", "September", 
        "October", "November", "December"];

        const date = new Date(dateString);

        return `${date.getDate()}, ${nameMonths[date.getMonth()]}, ${date.getFullYear()}`
    };
    const renderList = () => {
        return files.map(file =>{
            
                let downloadFilename = file.filename;
        
                
            return (
                <div className= "content" key={file.filename}>
                            <div className= "content-header" >
                            <h3 className= "title is-4"><b>{file.filename}</b></h3>
                            <h6 className = "subtitle is-6">{renderDate(file.uploadDate)}</h6>
                            <a href={`https://api.thetijanidisciples.com/file/download/${downloadFilename}`} download={file.filename} className="button is-dark is-medium" >Download</a>
                            <hr/>
                            </div>
                             
                        </div>  
            )
        })
    }  
    return(
        <div>
           <div className="header-title">
                <section className="hero is-medium has-text-centered">
                    <div className="hero-body">
                        <div className="container">
                            <h2 className="title is-2">Documents</h2>
                            
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
                    <button onClick= {nextHandler} className="pagination-next">Next Page</button>
                    </nav>
                }
                {pageNumber >= 1 && pageNumber < numberOfPages-1 && <nav className="has-text-right">
	                <button onClick={prevHandler} className="pagination-previous" >Previous Page</button>
	                <button onClick= {nextHandler} className="pagination-next">Next Page</button>
	            </nav>
                }
                {pageNumber === numberOfPages-1 && numberOfPages > 1 && <nav className= "has-text-right">
                <button onClick={prevHandler} className="pagination-previous" >Previous Page</button>
                </nav>
                }
            </div> 
        </div>
    )
}

export default File;