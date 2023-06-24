import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home(props) {
  const thumbClicked = async (action, id) => {
    try {
      const streamerId = id;
      let voteType = "";
      if (action === "thumb-up") {
        voteType = "upvote";
      } else if (action === "thumb-down") {
        voteType = "downvote";
      } else {
        return;
      }
      const url = `http://localhost:5000/streamers/${streamerId}/vote`;
      const response = await axios.put(url, { voteType });
      const streamerIndex = props.allStreamers.findIndex(
        (streamer) => streamer._id === streamerId
      )
      if (streamerIndex !== -1) {
        const updatedStreamers = [...props.allStreamers];
        const updatedStreamer = {
          ...updatedStreamers[streamerIndex],
          upvotes: response.data.upvotes,
          downvotes: response.data.downvotes, 
        };
        updatedStreamers[streamerIndex] = updatedStreamer;
        props.setAllStreamers(updatedStreamers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="streamers-list-container">
      <h2>Streamer List</h2>
      <table className="streamers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Platform</th>
            <th>Upvotes</th>
            <th>Downvotes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.allStreamers.map((streamer) => (
            <tr className="streamer-item" key={streamer._id}>
              <td className="name-cell">{streamer.name}</td>
              <td className="vote-cell">{streamer.platform}</td>
              <td className="vote-cell">{streamer.upvotes}</td>
              <td className="vote-cell">{streamer.downvotes}</td>
              <td className="actions-cell">
                <button type="button" onClick={() => thumbClicked("thumb-up", streamer._id)}>
                  <img className="thumb" src="/images/thumb-up.png" alt="Thumb Up" />
                </button>
                <button type="button" onClick={() => thumbClicked("thumb-down", streamer._id)}>
                  <img className="thumb" src="/images/thumb-down.png" alt="Thumb down" />
                </button>
                <Link to={`/streamer/${streamer._id}`} className="streamer-action">
                  Go to Streamer
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
