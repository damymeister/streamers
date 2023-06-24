import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { StyledImage,StreamerMain, StreamerDiv , H1, H4} from "../styles/styled-components/Streamer";
export default function Streamer(){
    const [streamerData, setStreamerData] = useState(null)
    const {id} = useParams();
    useEffect(() => {
        const fetchStreamerData = async () => {
          try {
            const url = `http://localhost:5000/streamers/${id}`;
            const { data } = await axios.get(url);
            setStreamerData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchStreamerData();
      }, [id]);
      
      return (
      <StreamerDiv>
        <Link to ="/"><span className="arrow-back"><i class="fas fa-arrow-left"></i></span></Link>
          {streamerData ? (
            <StreamerMain>
              <StyledImage className="photo" src ="https://www.tekstowo.pl/miniatura_teledysku,MtO0L-EbGtk.jpg"></StyledImage>
              <H1>{streamerData.name}</H1>
              <H4>Platform:</H4> <p>{streamerData.platform}</p>
              <H4>Description:</H4><p>{streamerData.description}</p>
            </StreamerMain>
          ) : (
            <p>Loading streamer data...</p>
          )}
      </StreamerDiv>
      );
    }