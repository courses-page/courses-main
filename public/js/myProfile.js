document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("courses-main JS imported successfully!");
  
      const changeProfilePicture = document.getElementById("changeProfilePicture");
      const pictureForm = document.getElementById("pictureForm");

      // const toggleStyle = (el) => {
      //   if(el.style.display == "none") {
      //     el.style.justifyContent = ""
      //   } else {
      //     el.style.justifyContent = "center"
      //   }
      // }
  
      changeProfilePicture.addEventListener("click", () => { 
        pictureForm.classList.toggle("visible");
        pictureForm.classList.toggle("hidden");
        // toggleStyle(pictureForm)
      })
  
    },
    false
  );
  