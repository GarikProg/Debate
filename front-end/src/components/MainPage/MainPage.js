import React, { useEffect } from 'react';
import MainNavigation from '../MainNavigation/MainNavigation'
import logo from '../../images/logo.png'
import { useDispatch } from 'react-redux';
import { checkCreatedThread } from '../../redux/actions'

function MainPage() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkCreatedThread())
  }, [])

  return (
  <>
  <MainNavigation />
  </>
  )
}

export default MainPage
