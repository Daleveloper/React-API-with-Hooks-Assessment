import React, {useEffect, useState} from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);
  
  useEffect(()=>{
    setAlbums([]);
    document.title = "Awesome Album App"
    const abortController = new AbortController();
    async function loadAlbums(){
     if(!user.id){
       return
     }
      try{
        const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          {signal: abortController.signal}
        );
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
      }catch (error){
        if(error.name === "AbortError"){
        console.log('Aborted', user.id)
        }else{
          throw error;
        }
      }
    }
    loadAlbums();
    return () => abortController.abort();
    
  },[user.id]);

  
  if(albums.length === 0){
    return  <p>Please click on a user name to the left</p>;
  }else{
    return (
      <div>
    <h2>{user.name} Albums</h2>  
    <ul className="album list">
      {albums.map((album, index) => (
        <li key={index}>{album.id}-{album.title} </li>
      ))}
    </ul>
        </div>
    )
  }
}

export default AlbumList;
