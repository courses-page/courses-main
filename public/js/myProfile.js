document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("courses-main JS imported successfully!");
  
      const changeProfilePicture = document.getElementById("changeProfilePicture");
      const pictureForm = document.getElementById("pictureForm");
  
      changeProfilePicture.addEventListener("click", () => { 
        pictureForm.classList.toggle("visible");
        pictureForm.classList.toggle("hidden");
      })
  
    },
    false
  );
  