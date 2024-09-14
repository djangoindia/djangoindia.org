import React from 'react'

import {
  Goals,
  Hero,
  JoinCommunity,
  LatestUpdate,
  Main,
  Support,
  WhatIsDjango,
} from '@sections'

const page = (): JSX.Element => {
  return (
    <>
      <Hero />
      <WhatIsDjango />
      <Goals />
      <Main />
      <JoinCommunity />
      <LatestUpdate />
      <Support />
    </>
  )
}

export default page
