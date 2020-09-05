import React, { useState } from 'react'
import './style.css'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function MovieRow({title, movieList} ) {
    const [scrollX,setScrollX] = useState(-400);
    const sizeMovieList = movieList.results.length;
    const handleLeftArrow = ()=>{

        let x = scrollX + Math.round(window.innerWidth / 2);
        // limitador da tela do usuario para que nao mostre o inicio dos filmes no caso nao tenha o espaço em branco durante rolagem
        if(x > 0){
            x=0
        }
        setScrollX(x)
    }
    const handleRightArrow = ()=>{
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = sizeMovieList * 150;
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60; 
        }
        setScrollX(x)
    }
    
    return (
        <div className="movieRow">
            <h2>
                {title}
            </h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize:50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize:50}}/>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft:scrollX,
                    width: sizeMovieList * 150
                }}>

                    {sizeMovieList > 0 && movieList.results.map((item, key) => {
                        return (
                            <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}