import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {getCreditsFromMovieId, getMovieDetail} from "../services/MovieServices.js";
import {CircularProgressBar} from "../components/CircleProgessBar.jsx";
import {ListButton, HeartButton, BookmarkButton} from "../components/MovieButton"

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [filteredCrews, setFilteredCrews] = useState([]);
  const importantJob = ["Screenplay", "Director", "Creator", "Writer", "Characters", "Story"]

  useEffect(() => {
    const getMovie = async () => {
      let promise = getMovieDetail(id);
      promise.then((data) => setMovie(data));
    };
    const getCredits = async () => {
      let promise = getCreditsFromMovieId(id);
      promise.then((data) => {
        let allCrews = data.crew
        let groupedCrews = allCrews.reduce((acc, member) => {
          if (!acc[member.name]) {
            acc[member.name] = {
              name: member.name,
              jobs: []
            };
          }

          if (!acc[member.name].jobs.includes(member.job)) {
            acc[member.name].jobs.push(member.job);
          }

          return acc;
        }, {});

        let result = Object.values(groupedCrews).filter(person =>
          person.jobs.some(job => importantJob.includes(job))
        );

        setFilteredCrews(result);
      });
    }
    getMovie();
    getCredits();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div
      className="w-full bg-cover bg-center justify-center flex-wrap"
      style={{
        backgroundImage: `
          linear-gradient(
            to right, 
            rgba(199.5, 220.5, 220.5, 1) calc((50vw - 170px) - 340px), 
            rgba(199.5, 220.5, 220.5, 0.84) 50%, 
            rgba(199.5, 220.5, 220.5, 0.84) 100%
          ), 
          url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})
        `,
      }}
    >
      <div className="flex w-full px-[40px] py-[30px] max-w-[1400px] mx-auto">
        <div className="flex items-center min-w-[300px] w-[300px] h-[450px]">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} // Poster phim
            alt={movie.title}
            className="w-full max-w-[400px] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center pl-[40px]">
          <div className="w-full mb-[24px] flex flex-wrap box-border">
            <h2 className="w-full m-0 p-0 text-[36px] font-semibold leading-none">
              {movie.title}
              <span className="opacity-80 font-normal pl-[8px]">
                {`(${movie.release_date.split('-')[0]})`}
              </span>
            </h2>
            <div>
              <span>
                {`${movie.release_date} (${movie.origin_country.join(', ')})`}
              </span>
              <span className="separator mx-[8px]">•</span>
              <span>
                {movie.genres && movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <Link
                      to={`/genre/${genre.id}`}
                      className="text-black text-[16px] hover:text-opacity-60 no-underline"
                    >
                      {genre.name}
                    </Link>
                    {index < movie.genres.length - 1 && ", "}
                  </span>
                ))}
              </span>
              <span className="separator mx-[8px]">•</span>
              <span>
                {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex items-center justify-center">
                <div className="w-[60px] h-[60px]">
                  <CircularProgressBar percentage={movie.vote_average / 10} />
                </div>
                <div className="text font-bold ml-1">
                  User <br/> Score
                </div>
              </div>

            </div>
            <ul className="mb-[20px] w-full h-[68px] flex items-center justify-start list-none">
              <li className="py-[3px] mr-[20px]">
                <ListButton/>
              </li>
              <li className="py-[3px] mr-[20px]">
                <HeartButton/>
              </li>
              <li className="py-[3px] mr-[20px]">
                <BookmarkButton/>
              </li>
              <li className="flex items-center ml-1">
                <div className="flex h-[24px] hover:text-white font-semibold cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Play Trailer</span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="tagline text-[17.6px] font-normal italic opacity-70"
            >
              {movie.tagline}
            </h3>
            <h3
              className="text-[20.8px] mt-[10px] mb-[8px] font-semibold"
            >
              Overview
            </h3>
            <p className="leading-6">
              {movie.overview}
            </p>
            <ol className="people flex mt-[20px] list-none list-inside justify-start flex-wrap">
              {filteredCrews.map((person, index) => (
                <li key={index} className="profile w-1/3 basis-1/3 text-left mb-3.5 mr-0 box-border pr-5">
                  <p className="font-bold">{person.name}</p>
                  <p>{person.jobs.join(', ')}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
