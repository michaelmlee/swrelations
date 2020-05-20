import React from 'react';
import * as PropTypes from "prop-types";

const Crawl = ({title, planet, ship , vehicle, charA, charB}) =>
      <>
        <div className="fade"></div>
        <section className="star-wars">
          <div className="crawl">
            <div className="title">
              <p>Found Relations</p>
              <h1>{charA} & {charB}</h1>
            </div>
            <p>{charA} and {charB} were found in movie(s): {title}. {planet.length > 0 ? "They come from the same planet " : ""}{planet}{ship.length > 0 ? "They can be seen together riding the ship ": ""} {ship}{vehicle.length > 0 ? "They can be seen together using the vehicle: ": ""} {vehicle}</p>
            <p className="ending">The End</p>
          </div>
        </section>
      </>;

export default Crawl;

Crawl.propTypes = {
  charA: PropTypes.string.isRequired,
  charB: PropTypes.string.isRequired,
  planet: PropTypes.string.isRequired,
  ship: PropTypes.string,
  title: PropTypes.string,
  vehicle: PropTypes.string
}