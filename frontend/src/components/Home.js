import React, { useState, useEffect } from "react";
import axios from "axios";
import StreamerAddForm from "./StreamerAddForm.tsx";
import StreamersList from "./StreamersList";
export default function Home() {
  const [allStreamers, setAllStreamers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [streamersPerPage, setStreamersPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalStreamersCount, setTotalStreamersCount] = useState(0);
  const fetchAllStreamers = async () => {
    try {
      setIsLoading(true);
      const url = `http://localhost:5000/streamers?page=${currentPage}&pageSize=${streamersPerPage}`;
      const { data } = await axios.get(url);
      setAllStreamers(data.streamers);
      setTotalStreamersCount(data.totalStreamersCount);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStreamers();
  }, [currentPage]);

  useEffect(() => {
    if(allStreamers.length > streamersPerPage){
      setcurrentPage(currentPage+1);
    }
  }, [allStreamers]);


  const handleAddStreamerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <button className="add-streamer-btn" onClick={handleAddStreamerClick}>
          Add Streamer
        </button>
      </header>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={handleCloseModal}>
            &times;
            </button>
            <StreamerAddForm allStreamers={allStreamers} setAllStreamers = {setAllStreamers} setcurrentPage = {setcurrentPage}  streamersPerPage = {streamersPerPage}/>
          </div>
        </div>
      )}
    {isLoading ? (
      <div className="loader">Loading....</div>
    ) : allStreamers.length > 0 ? (
      <StreamersList allStreamers={allStreamers} setAllStreamers={setAllStreamers} currentPage={currentPage} setcurrentPage = {setcurrentPage} totalStreamersCount = {totalStreamersCount} streamersPerPage={streamersPerPage}/>
    ) : (
      <h1>Database is empty...</h1>
    )}
    </div>
  );
}
