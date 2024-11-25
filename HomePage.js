document.addEventListener("DOMContentLoaded", () => {
  fetch("HomePage.json")
    .then(response => response.json())
    .then(data => {
      loadCarouselImages(data.carouselImages);
      loadServiceImages("hottestTrending", data.hottestTrending);
      loadServiceImages("discountImages", data.discountImages);
      loadServiceImages("fictionImages", data.fictionImages);
      loadServiceImages("newestArrivals", data.newestArrivals);
      loadServiceImages("internationalBestSellers", data.internationalBestSellers);
      loadServiceImages("featuredAuthors", data.featuredAuthors);
    })
    .catch(error => console.error("Error loading images:", error));
});

function loadCarouselImages(images) {
  const carouselImages = document.querySelector(".carousel-images");
  carouselImages.innerHTML = images
    .map(img => `<div class="carousel-slide"><img src="${img.src}" alt="${img.alt}"></div>`)
    .join("");
}

function loadServiceImages(sectionId, images) {
  const serviceSection = document.getElementById(sectionId);
  serviceSection.innerHTML = images
    .map(img => {
      const isAuthorSection = sectionId === "featuredAuthors"; // Adjust this ID based on your HTML
      return `
        <div class="service-card">
          ${isAuthorSection ? `<img src="${img.src}" alt="${img.alt}" height="470px">`
                            : `<a href="Explore.html?category=${img.category}"><img src="${img.src}" alt="${img.alt}" height="470px"></a>`}
        </div>`;
    })
    .join("");
}

