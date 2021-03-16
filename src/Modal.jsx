import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ film, modal, search, wait, closeModal }) => {
  return (
    <>
      {wait ? <p className="modal">Loading</p> : null}
      {modal ? (
        <section className="modal" onClick={closeModal}>
          <AnimatePresence>
            <motion.section
              className="inner-modal"
              initial={{ scale: 1.3, rotate: 45, opacity: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                stiffness: 200,
                damping: 20
              }}
            >
              <img
                alt={`Plakat fra filmen ${film.Title}`}
                className="modal-poster"
                src={film.Poster}
                value={search}
              />
              <h2>{film.Title}</h2>

              <p>Skuespillere: {film.Actors}</p>
              <p>Sjanger: {film.Genre}</p>
              <p>IMDB-rating: {film.imdbRating}</p>
              <p>Stemmer (IMDB): {film.imdbVotes}</p>
              <p>Plot: {film.Plot}</p>

              <button className="onemovie2" type="button" onClick={closeModal}>
                Lukk
              </button>
            </motion.section>
          </AnimatePresence>
        </section>
      ) : null}
    </>
  );
};

export default Modal;
