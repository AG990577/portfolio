const glow=document.querySelector(".cursor-glow");
if(glow){window.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});}

const navLinks=document.querySelectorAll(".dock a");
const sections=document.querySelectorAll("section[id]");
function activeNav(){
  let current="home";
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-180) current=s.id; });
  navLinks.forEach(a=>a.classList.toggle("active", a.getAttribute("href")==="#"+current));
}
window.addEventListener("scroll",activeNav); activeNav();

const videoModal=document.getElementById("videoModal");
const modalVideo=document.getElementById("modalVideo");
const modalTitle=document.getElementById("modalTitle");
document.querySelectorAll(".video-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const src=card.dataset.video;
    if(!src) return;
    modalTitle.textContent=card.dataset.title || "Video Demo";
    modalVideo.src=src;
    videoModal.classList.add("show");
    modalVideo.play().catch(()=>{});
  });
});
function closeVideoModal(){
  if(!videoModal) return;
  videoModal.classList.remove("show");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}
document.querySelector(".modal .close")?.addEventListener("click",closeVideoModal);
document.querySelector(".modal-bg")?.addEventListener("click",closeVideoModal);

const posterModal=document.getElementById("posterModal");
const posterImg=document.getElementById("posterFull");
const posterTitle=document.getElementById("posterTitle");
document.querySelectorAll(".poster-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const src=card.dataset.full;
    if(!src) return;
    posterImg.src=src;
    posterTitle.textContent=card.dataset.title || "Poster";
    posterModal.classList.add("show");
  });
});
function closePoster(){
  if(!posterModal) return;
  posterModal.classList.remove("show");
  posterImg.removeAttribute("src");
}
document.querySelector(".poster-close")?.addEventListener("click",closePoster);
document.querySelector(".poster-modal-bg")?.addEventListener("click",closePoster);

let pageIndex=0;
const bookImage=document.getElementById("bookImage");
const bookTitle=document.getElementById("bookTitle");
const pageNow=document.getElementById("pageNow");
const pageTotal=document.getElementById("pageTotal");
if(pageTotal && typeof bookPages!=="undefined") pageTotal.textContent=String(bookPages.length).padStart(2,"0");
function renderBook(){
  if(!bookPages?.length || !bookImage) return;
  bookImage.classList.add("flip");
  setTimeout(()=>{
    bookImage.src=bookPages[pageIndex].src;
    if(bookTitle) bookTitle.textContent=bookPages[pageIndex].title;
    if(pageNow) pageNow.textContent=String(pageIndex+1).padStart(2,"0");
    bookImage.onload=()=>bookImage.classList.remove("flip");
  },120);
}
function prevBook(){pageIndex=(pageIndex-1+bookPages.length)%bookPages.length;renderBook();}
function nextBook(){pageIndex=(pageIndex+1)%bookPages.length;renderBook();}
document.querySelector(".book-nav.prev")?.addEventListener("click",prevBook);
document.querySelector(".book-nav.next")?.addEventListener("click",nextBook);
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeVideoModal();closePoster();}
  if(e.key==="ArrowLeft") prevBook();
  if(e.key==="ArrowRight") nextBook();
});
