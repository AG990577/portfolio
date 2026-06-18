const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const navLinks = document.querySelectorAll(".dock a, .top-nav nav a");
const sections = document.querySelectorAll("section[id]");

function activeNav() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", activeNav);
activeNav();

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".video-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.video;
    if (!src) {
      alert("这个视频位置还没有嵌入作品。");
      return;
    }
    modal.classList.add("show");
    modalTitle.textContent = card.dataset.title;
    modalVideo.src = src;
    modalVideo.play().catch(() => {});
  });
});

function closeModal() {
  if (!modal.classList.contains("show")) return;
  modal.classList.remove("show");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

document.querySelector(".close")?.addEventListener("click", closeModal);
document.querySelector(".modal-bg")?.addEventListener("click", closeModal);

let pageIndex = 0;
const bookImage = document.getElementById("bookImage");
const bookTitle = document.getElementById("bookTitle");
const pageNow = document.getElementById("pageNow");
const pageTotal = document.getElementById("pageTotal");

if (pageTotal && typeof bookPages !== "undefined") {
  pageTotal.textContent = String(bookPages.length).padStart(2, "0");
}

function renderBook() {
  if (!bookImage || !bookPages.length) return;
  bookImage.classList.add("flip");
  setTimeout(() => {
    bookImage.src = bookPages[pageIndex].src;
    bookTitle.textContent = bookPages[pageIndex].title;
    pageNow.textContent = String(pageIndex + 1).padStart(2, "0");
    bookImage.onload = () => bookImage.classList.remove("flip");
  }, 160);
}

function prevBook() {
  pageIndex = (pageIndex - 1 + bookPages.length) % bookPages.length;
  renderBook();
}

function nextBook() {
  pageIndex = (pageIndex + 1) % bookPages.length;
  renderBook();
}

document.querySelector(".book-nav.prev")?.addEventListener("click", prevBook);
document.querySelector(".book-nav.next")?.addEventListener("click", nextBook);

renderBook();

const posterModal = document.getElementById("posterModal");
const posterFull = document.getElementById("posterFull");
const posterTitle = document.getElementById("posterTitle");

document.querySelectorAll(".poster-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.full;
    if (!src) return;
    posterFull.src = src;
    posterTitle.textContent = card.dataset.title || "Poster";
    posterModal.classList.add("show");
  });
});

function closePoster() {
  if (!posterModal.classList.contains("show")) return;
  posterModal.classList.remove("show");
  posterFull.removeAttribute("src");
}

document.querySelector(".poster-close")?.addEventListener("click", closePoster);
document.querySelector(".poster-modal-bg")?.addEventListener("click", closePoster);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    closePoster();
  }
  if (event.key === "ArrowLeft") prevBook();
  if (event.key === "ArrowRight") nextBook();
});
