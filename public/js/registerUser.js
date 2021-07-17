document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("courses-main JS imported successfully!");

    const userBtn = document.getElementById("userBtn");
    const companyBtn = document.getElementById("companyBtn");

    userBtn.addEventListener("click", () => {
      const userForm = document.getElementById("userForm");
      const companyForm = document.getElementById("companyForm");

      userForm.style.display = "block";
      companyForm.style.display = "none";
    })

    companyBtn.addEventListener("click", () => {
      const userForm = document.getElementById("userForm");
      const companyForm = document.getElementById("companyForm");

      userForm.style.display = "none";
      companyForm.style.display = "block";
    })
  },
  false
);
