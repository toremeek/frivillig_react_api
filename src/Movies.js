import { useState } from "react";
import Modal from "./Modal";
import { request } from "./requests";

const Movies = ({ loading, sort, error, search, data }) => {
  const [film, setFilm] = useState("");
  const [wait, setWait] = useState(false);
  const [modal, setModal] = useState(false);
  //Tar i mot event og title fra onclick på knappen
  const newMovie = (title) => {
    setWait(true);
    getResult(title);
  };

  /*cypres, next.js, */

  //gjør et nytt api-kall med filmtittelelen knyttet til knappen som ble trykket
  const getResult = async (Title, Year) => {
    const getTitle = await request(
      /*Henter ut utvidet info om den spesifikke filmen*/
      `https://www.omdbapi.com/?apikey=a994c928&t=${Title}&y=${Year}&plot=full`
    );
    setFilm(getTitle);
    setWait(false);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <p>
        Sorter resultatet etter:
        <select className="select" onChange={(e) => sort(e.target.value)}>
          <option value="alfabetisk">Alfabetisk</option>
          <option value="utgitt">Utgitt</option>
        </select>
      </p>

      <Modal
        modal={modal}
        setModal={setModal}
        closeModal={closeModal}
        film={film}
        wait={wait}
        search={search}
      />
      <section className="movies">
        {loading ? <p>Loading</p> : null}
        {error ? <p>{error}</p> : null}
        {!error && data?.length > 0 ? (
          <div className="movies_wrapper">
            {data.map((movie) => (
              <div className="movie_item" key={movie.imdbID}>
                <img
                  alt={`Plakat fra filmen ${movie.Title}`}
                  className="poster"
                  src={movie.Poster}
                  onClick={() => newMovie(movie.Title, movie.Year)}
                />
                <p> {movie.Title}</p>
                <p>Utgitt: {movie.Year}</p>
                <button
                  type="button"
                  className="onemovie"
                  onClick={() => newMovie(movie.Title, movie.Year)}
                >
                  Les mer om filmen
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Movies;
