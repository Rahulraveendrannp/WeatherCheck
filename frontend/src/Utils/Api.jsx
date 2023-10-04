


export const fetchPollutionData=(apiUrl,lat,lon)=>{
    
    return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
}