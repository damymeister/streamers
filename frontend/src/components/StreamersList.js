import React from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Pagination
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';
import { StreamersListContainer, StreamersListHeading, StyledButton } from '../styles/styled-components/StyledStreamerslist';

export default function Home(props) {
  const navigate = useNavigate();

  const thumbClicked = async (action, id) => {
    try {
      const streamerId = id;
      let voteType = '';
      if (action === 'thumb-up') {
        voteType = 'upvote';
      } else if (action === 'thumb-down') {
        voteType = 'downvote';
      } else {
        return;
      }
      const url = `http://localhost:5000/streamers/${streamerId}/vote`;
      const response = await axios.put(url, { voteType });

      const streamerIndex = props.allStreamers.findIndex(
        (streamer) => streamer._id === streamerId
      );

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

  const streamerDetails = (id) => {
    navigate(`/streamer/${id}`);
  };

  return (
    <StreamersListContainer>
      <StreamersListHeading>Streamers List</StreamersListHeading>
      <Table style={{ marginBottom: '1rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Upvotes</TableCell>
            <TableCell>Downvotes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.allStreamers.map((streamer) => (
            <TableRow key={streamer._id}>
              <TableCell>{streamer.name}</TableCell>
              <TableCell>{streamer.platform}</TableCell>
              <TableCell>{streamer.upvotes}</TableCell>
              <TableCell>{streamer.downvotes}</TableCell>
              <TableCell>
                <IconButton onClick={() => thumbClicked('thumb-up', streamer._id)}><ThumbUpIcon /></IconButton>
                <IconButton onClick={() => thumbClicked('thumb-down', streamer._id)}><ThumbDownIcon /></IconButton>
                <StyledButton type="button" onClick={() => streamerDetails(streamer._id)}>Details</StyledButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(props.totalStreamersCount / props.streamersPerPage)}
        page={props.currentPage}
        onChange={(event, page) => props.setcurrentPage(page)}
      />
    </StreamersListContainer>
  );
}
