import React from 'react';

import {
  Goals,
  Hero,
  JoinCommunity,
  LatestUpdate,
  Main,
  Support,
  WhatIsDjango,
  GoToTop,
} from '@sections';

const page = () => {
  return (
    <>
      <Hero />
      <WhatIsDjango />
      <Goals />
      <Main />
      <JoinCommunity />
      <LatestUpdate />
      <Support />
      <GoToTop />
    </>
  );
};

export default page;
