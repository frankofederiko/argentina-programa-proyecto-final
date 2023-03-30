const smoothscrollLinks = document.querySelectorAll(".links");

for (let i = 0; i < smoothscrollLinks.length; i++) {
  smoothscrollLinks[i].addEventListener("click", function (event) {
    event.preventDefault();

    const target = this.hash;
    const targetElement = document.querySelector(target);

    if (!targetElement) return;

    const targetOffset = targetElement.offsetTop;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth",
    });
  });
}
const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll("#nav-inicio a");

function handleWaypoint(direction, section) {
  let activeSection = section;
  if (direction === "up") {
    activeSection = activeSection.previousElementSibling || sections[0];
  }
  const activeLink = document.querySelector(
    '#nav-inicio a[href="#' + activeSection.getAttribute("id") + '"]'
  );
  navigationLinks.forEach((navLink) =>
    navLink.parentElement.classList.remove("current")
  );
  activeLink.parentElement.classList.add("current");
}

sections.forEach((section) => {
  const sectionWaypoint = section.offsetTop + section.offsetHeight * 0.35;
  window.addEventListener("scroll", () => {
    const currentPosition = window.pageYOffset;
    if (
      currentPosition >= section.offsetTop &&
      currentPosition <= sectionWaypoint
    ) {
      handleWaypoint("down", section);
    } else if (
      currentPosition >= sectionWaypoint &&
      (!section.nextElementSibling ||
        currentPosition <= section.nextElementSibling.offsetTop)
    ) {
      handleWaypoint("up", section);
    }
  });
});
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  var nav = document.querySelector("#nav-inicio");
  var h = header.offsetHeight;
  var y = window.pageYOffset;

  if (y > h * 0.2 && y < h && window.outerWidth > 768) {
    nav.style.display = "none";
  } else {
    if (y < h * 0.2) {
      nav.classList.remove("opaque");
      nav.style.display = "block";
    } else {
      nav.classList.add("opaque");
      nav.style.display = "block";
    }
  }
});
