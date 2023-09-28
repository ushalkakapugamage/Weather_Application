console.log("hi");

const menu = document.getElementById("menu");
const menu_header = document.getElementById("menu-icon");
menu_header.addEventListener("click", () => {
    menu.classList.toggle("active");
});

const icon = document.getElementById("icon");
const text = document.getElementById("theme-text");
icon.onclick = () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "ASSETS/sun.png";
        text.innerText = "Light";

    } else {
        icon.src = "ASSETS/moon.png";
        text.innerText = "Dark";
    }
};




