import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Secret() {
  const [data, setData] = useState('Loading..')
  useEffect(() => {
    (async () => {
      const resp = await fetch('/api/secret');
      const json = await resp.json();
      setData(JSON.stringify(json))
    })();
  }, []);

  return (
    <>
    <div>haha</div>
    </>
  )
}


