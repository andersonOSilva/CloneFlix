import React from 'react'

import './style.css'


export default ({featured}) =>{
    // convertendo a data em string para date 
    let firstDate=new Date(featured.first_air_date)
    let genres = []
    let description = featured.overview
    if(description.length > 200){
        description = description.substring(0,200)+'...'
    }
    //pegando generos
    featured.genres.map((item) =>{genres.push(item.name)})
    
    return (
        <section className="featured" style={{
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundImage:(`url(https://image.tmdb.org/t/p/original${featured.poster_path})`)
            
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {featured.original_name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">
                            {featured.vote_average} pontos
                        </div>
                        <div className="featured--year">
                            {firstDate.getFullYear()}
                        </div>
                        <div className="featured--seasons">
                            {featured.number_of_seasons} Tempoada{featured.number_of_seasons !== 1?'s':''}
                        </div>
                    </div>
                    <div className="featured--description">
                        {description}
                    </div>
                    <div className="featured--buttons">
                        <a href={`/watch${featured.id}`} className='featured--watchbutton'>
                          ▶ Assistir
                        </a>
                        <a href={`/list${featured.id}`} className='featured--mylistbutton'>
                           + Minha Lista
                        </a>

                    </div>
                    <div className="featured--genres">
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
            
        </section>
    )
}