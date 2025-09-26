
    const searchIcon = document.getElementById("searchIcon");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeOverlay = document.getElementById("closeOverlay");

    searchIcon.addEventListener("click", (e) => {
        e.preventDefault();
        searchOverlay.style.display = "flex"; // show overlay
    });

    closeOverlay.addEventListener("click", () => {
        searchOverlay.style.display = "none"; // hide overlay
    });

    // Close if clicked outside box
    window.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
        searchOverlay.style.display = "none";
        }
    });
