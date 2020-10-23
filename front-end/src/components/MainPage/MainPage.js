import React, { useEffect } from 'react';
import MainNavigation from '../MainNavigation/MainNavigation'
import logo from '../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { checkCreatedThread, sortHotThreads } from '../../redux/actions'

function MainPage() {
  const appThreads = useSelector(state => state.appThreads);
  const dispatch = useDispatch();
  
  useEffect(() => {
    appThreads && dispatch(checkCreatedThread());
  }, [])

  return (
  <>
  <MainNavigation />
  </>
  )
}

export default MainPage
