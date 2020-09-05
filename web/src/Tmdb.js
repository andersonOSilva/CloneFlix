const API_KEY = '7c0060b21b17fb8c83ed6e21b4df218a';
const API_BASE = 'https://api.themoviedb.org/3';

// -originais netflix 
// -recomendados
// -em alta(top rated)
// -ação
// -comedia
// -terror
// -romance
// -documentarios 

const basicFetch = async (endpoint) =>
{
    const req = await fetch(
        `${API_BASE}${endpoint}`
    );
    const json = await req.json();

    return (json)
}

export default {
    getHomeList : async () =>
    {
        return [
            {
                slug:'originals',
                title:'Originais do Netflix',
                items:await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'trending',
                title:'Recomendados para voce',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'toprated',
                title:'Em Alta',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'action',
                title:'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'comedy',
                title:'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'horror',
                title:'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'romance',
                title:'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'documentary',
                title:'Documentario',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ]

    },
    getMovieInfo: async (movie_id,type) =>
    {
        let info ={};
        if (movie_id){
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movie_id}?language=pt-BR&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movie_id}?language=pt-BR&api_key=${API_KEY}`)
                    
                    break;
                default :
                    info=null
                    break
            }    
        }
        return info
    }

        
    }