import React, { useContext } from 'react';
import { albumsData, assets, songsData } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import DisplayNav from '../DisplayNav/DisplayNav';

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);
  const albumId = parseInt(id);
  const albumData = albumsData[albumId];

  // Define song ranges for each album (based on your mapping)
  const albumSongMap = {
    0: [0, 5],   // Top The Weeknd Songs
    1: [6, 14],  // Top Songs India
    // Add more mappings here when you add new albums
  };

  const [startIdx, endIdx] = albumSongMap[albumId] || [0, 0];
  const filteredSongs = songsData.slice(startIdx, endIdx + 1);

  return (
    <>
      <DisplayNav />

      {/* Album Header */}
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 h-48 object-cover rounded' src={albumData.image} alt="" />
        <div className='flex flex-col'>
          <p>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
        </div>
      </div>

      {/* Header Row */}
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b> Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt='' />
      </div>
      <hr />

      {/* Songs List */}
      {filteredSongs.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
          key={item.id}
        >
          <p className='text-white'>
            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
            <img className='inline w-10 mr-5' src={item.image} alt="" />
            {item.name}
          </p>
          <p className='text-[15px]'>{albumData.name}</p>
          <p className='text-[15px] hidden sm:block'>5 days ago</p>
          <p className='text-[15px] text-center'>{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
