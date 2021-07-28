document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("courses-main JS imported successfully!");

    const userBtn = document.getElementById("userBtn");
    const companyBtn = document.getElementById("companyBtn");

    userBtn.addEventListener("click", () => {
      const userForm = document.getElementById("userForm");
      const companyForm = document.getElementById("companyForm");

      userForm.style.display = "flex";
      companyForm.style.display = "none";
      userForm.style.justifyContent = "center";
      companyForm.style.justifyContent = "";
    })

    companyBtn.addEventListener("click", () => {
      const userForm = document.getElementById("userForm");
      const companyForm = document.getElementById("companyForm");

      userForm.style.display = "none";
      companyForm.style.display = "flex";
      companyForm.style.justifyContent = "center";
      userForm.style.justifyContent = "";
    })
  },
  false
);
