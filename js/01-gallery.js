import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const containerGalleryEl = document.querySelector(".gallery");
containerGalleryEl.insertAdjacentHTML("beforeend", addGalleryItems());
containerGalleryEl.addEventListener("click", onGalleryImageClick);

function addGalleryItems() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
    </div>`;
    })
    .join("");
}

function onGalleryImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);

  instance.show();
  console.log(event);
  document.addEventListener("keydown", onEsc);

  function onEsc(event) {
    if (event.code === "Escape") {
      instance.close();
      console.log(event);
    }
    document.removeEventListener("keydown", onEsc);
  }
}
