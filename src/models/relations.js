import Movie from "./movie.js";
import Category from './category.js'
import Genre from "./genre.js";
import movie_genre from "./movie_genre.js";
import movie_actor from "./movie_actor.js";
import Actor from "./actor.js";
import Poster from "./poster.js";
// .hasOne
// .belongsTo
// .hasMany
// .belongsToMany

Category.hasMany(Movie)
Movie.belongsTo(Category)

Poster.belongsTo(Movie)
Movie.hasMany(Poster)

Movie.belongsToMany(Genre, {through: movie_genre})
Movie.belongsToMany(Actor, {through: movie_actor})


const content = {
    Movie,Category,Genre,Actor,Poster
}
export default content;