import React, { useEffect, useState } from 'react'

import Tmdb from './Tmdb'

import MovieRow from './components/MovieRow'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () =>{
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader,setBlackHeader] = useState(false)
  useEffect(()=>{
    const loadAll = async () =>{
      // pegar lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      // pegando destaque (featured)
      let originals = list.filter((i)=>i.slug === 'originals')
      let randomChoosen = Math.floor(Math.random() * (originals[0].items.results.length-1))
      let choosen = originals[0].items.results[randomChoosen]
      let choosenInfo = await Tmdb.getMovieInfo(choosen.id,'tv')
      setFeaturedData(choosenInfo)

    }
    loadAll();
  },[])
  useEffect(()=>{
    const scrollListener = () =>
    {
      if(window.scrollY>10){

        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll',scrollListener);
  })
 return(
   <div className="page">
     {/* header
     destaque
     (as listas)
     rodape basicao */}
     <Header black={blackHeader} />
     {featuredData &&
      <FeaturedMovie featured={featuredData}/>
     }
     
     <section className="lists">
       {movieList.map((item, key) =>{
          return (
            <MovieRow key={key} title={item.title} movieList={item.items}/>
             ) 
           }
         )
       }
     </section>
     <footer>
       Feito com <span role='img' aria-label='coração'>❤ </span> pelo Anderson com apoio da B7Web<br/>
       Direitos de imagem para netflix<br/>
       Dados coletados da api do TheMovieDb.org
     </footer>
     {movieList.length <= 0 && 
       <div className="loading">
       <img src='https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif'/>
     </div>}
   </div>
 )
  
}