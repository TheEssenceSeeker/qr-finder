import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailsPage } from './pages/DetailsPage'
import { AuthPage } from './pages/AuthPage'
import { InfoPage } from './pages/InfoPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Route path="/links">
          <LinksPage />
        </Route>
        <Route path="/details/:id">
          <DetailsPage />
        </Route>
        <Route path="/info/:id">
          <InfoPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/">
        <AuthPage />
      </Route>
      <Route path="/info/:id">
        <InfoPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
