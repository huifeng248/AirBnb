// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { useParams } from 'react-router-dom';

import SpotBrowser from "./components/Spot/SpotsBrowser";
import SpotDetail from "./components/Spot/SpotDetail";
import { getSpots } from "./store/spot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const {spotId} = useParams()
  const spots = useSelector(state => {
    const allSpots = state.spots
    // console.log("all spots", allSpots)
    return Object.values(allSpots)
})
const spot = spots[spotId]

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getSpots())
}, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SpotBrowser spots={spots}/>
          </Route>
          <Route path={`/spots/:spotId`}>
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;