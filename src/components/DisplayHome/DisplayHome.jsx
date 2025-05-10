import React from 'react';
import { albumsData, songsData } from '../../assets/assets';
import AlbumItem from '../AlbumItem/AlbumItem';
import SongItem from '../SongItem/SongItem';
import DisplayNav from '../DisplayNav/DisplayNav';

const DisplayHome = () => {
  const weekndSongs = songsData.filter((song) =>
    song.desc.toLowerCase().includes('weeknd')
  );
  const newReleases = songsData.filter((song) => song.category === 'new');
  const trendingIndia = songsData.filter((song) => song.category === 'mass');
  const trendingLove = songsData.filter((song) => song.category === 'love');
  const trendingBeats = songsData.filter((song) => song.category === 'beat');

  return (
    <>
      <DisplayNav />

      {/* Featured Charts */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto gap-4">
          {albumsData.map((item) => (
            <AlbumItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Top The Weeknd */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">Top The Weeknd</h1>
        <div className="flex overflow-auto gap-4">
          {weekndSongs.map((item) => (
            <SongItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* New Releases */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">New Releases</h1>
        <div className="flex overflow-auto gap-4">
          {newReleases.map((item) => (
            <SongItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Trending India */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">Trending India</h1>
        <div className="flex overflow-auto gap-4">
          {trendingIndia.map((item) => (
            <SongItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Trending Love */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">Love Hits</h1>
        <div className="flex overflow-auto gap-4">
          {trendingLove.map((item) => (
            <SongItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Trending Beats */}
      <div className="mb-6">
        <h1 className="my-5 font-bold text-2xl">Beat Drops</h1>
        <div className="flex overflow-auto gap-4">
          {trendingBeats.map((item) => (
            <SongItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
