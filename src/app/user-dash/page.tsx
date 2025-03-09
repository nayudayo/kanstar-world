import React from 'react';
import CoverPhoto from '@/components/dashboard/CoverPhoto';
import KanstarNFTLeaderboard from '@/components/dashboard/KanstarNFTLeaderboard';
import KanstarTokenLeaderboard from '@/components/dashboard/KanstarTokenLeaderboard';
import MyKanstarNFTs from '@/components/dashboard/MyKanstarNFTs';
import MyKanstarToken from '@/components/dashboard/MyKanstarToken';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const UserDash: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/backgrounds/cosmic-background.png)' }}
    >
      <DashboardHeader />
      <div className="container mx-auto p-4">
        <div className="parent h-[90vh] grid grid-cols-6 grid-rows-5 gap-4">
          <div className="div1 col-start-1 col-end-5 row-start-1 row-end-2">
            <CoverPhoto />
          </div>
          <div className="div2 col-start-5 col-end-7 row-start-1 row-end-3">
            <KanstarNFTLeaderboard />
          </div>
          <div className="div3 col-start-5 col-end-7 row-start-3 row-end-5">
            <KanstarTokenLeaderboard />
          </div>
          <div className="div4 col-start-1 col-end-3 row-start-2 row-end-5">
            <MyKanstarNFTs />
          </div>
          <div className="div5 col-start-3 col-end-5 row-start-2 row-end-5">
            <MyKanstarToken />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDash; 