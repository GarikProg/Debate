import React, { useEffect } from 'react';
import MainNavigation from '../MainNavigation/MainNavigation'
import logo from '../../images/logo.png'
import { useDispatch } from 'react-redux';
import { checkCreatedThread, sortHotThreads } from '../../redux/actions'

function MainPage() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sortHotThreads());
    dispatch(checkCreatedThread());
  }, [])

  return (
  <>
  <MainNavigation />
  </>
  )
}

export default MainPage
