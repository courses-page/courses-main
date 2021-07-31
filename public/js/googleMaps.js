const url = window.location.href;
const urlArr = url.split("/");
const id = urlArr[urlArr.length -1];


const getAddress = () => {
    axios
      .get(`https://courses-main.herokuapp.com/courseAddress/${id}`)
      .then(response => {
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: response.data.courseInfo.location.coordinates[0], lng: response.data.courseInfo.location.coordinates[1]}
          });
        const myMarker = new google.maps.Marker({
        position: {
            lat: response.data.courseInfo.location.coordinates[0],
            lng: response.data.courseInfo.location.coordinates[1],
        },
        map: map,
        title: "Course located here"
        });    
      })
      .catch(error => {
        console.log(error);
      });
  }
   
getAddress();