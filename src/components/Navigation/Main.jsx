import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ParticipantZone from 'views/ParticipantZone/ParticipantZone'

const Main = () => (
  <main>
    <Switch>
      <Route path='/' exact component={ParticipantZone}/>
      <Redirect to="/" />
    </Switch>
  </main>
)

export default Main
