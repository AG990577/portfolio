const glow=document.querySelector(".cursor-glow");
if(glow){window.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});}
const navLinks=document.querySelectorAll(".dock a");
const sections=document.querySelectorAll("section[id]");
function activeNav(){
  let cur="home";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-160)cur=s.id});
  navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
}
window.addEventListener("scroll",activeNav);
activeNav();

const modal=document.getElementById("videoModal");
const modalVideo=document.getElementById("modalVideo");
const modalTitle=document.getElementById("modalTitle");

document.querySelectorAll(".video-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const src=card.dataset.video;
    if(!src){alert("这个视频位置还没有嵌入作品。");return;}
    modal.classList.add("show");
    modalTitle.textContent=card.dataset.title;
    modalVideo.src=src;
    modalVideo.play().catch(()=>{});
  });
});

function closeModal(){
  modal.classList.remove("show");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}
document.querySelector(".close").addEventListener("click",closeModal);
document.querySelector(".modal-bg").addEventListener("click",closeModal);

let pageIndex=0;
const bookImage=document.getElementById("bookImage");
const bookTitle=document.getElementById("bookTitle");
const pageNow=document.getElementById("pageNow");
const pageTotal=document.getElementById("pageTotal");

if(pageTotal && typeof bookPages !== "undefined"){
  pageTotal.textContent=String(bookPages.length).padStart(2,"0");
}

function renderBook(){
  if(!bookPages.length)return;
  bookImage.classList.add("flip");
  setTimeout(()=>{
    bookImage.src=bookPages[pageIndex].src;
    bookTitle.textContent=bookPages[pageIndex].title;
    pageNow.textContent=String(pageIndex+1).padStart(2,"0");
    bookImage.onload=()=>bookImage.classList.remove("flip");
  },160);
}
function prevBook(){
  pageIndex=(pageIndex-1+bookPages.length)%bookPages.length;
  renderBook();
}
function nextBook(){
  pageIndex=(pageIndex+1)%bookPages.length;
  renderBook();
}
document.querySelector(".book-nav.prev").addEventListener("click",prevBook);
document.querySelector(".book-nav.next").addEventListener("click",nextBook);

document.addEventListener("keydown",e=>{
  if(e.key==="Escape")closeModal();
  if(e.key==="ArrowLeft")prevBook();
  if(e.key==="ArrowRight")nextBook();
});

renderBook();


/* Poster full preview */
const posterModal = document.getElementById("posterModal");
const posterFull = document.getElementById("posterFull");
const posterTitle = document.getElementById("posterTitle");

document.querySelectorAll(".poster-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const src = card.dataset.full;
    if(!src) return;
    posterFull.src = src;
    posterTitle.textContent = card.dataset.title || "Poster";
    posterModal.classList.add("show");
  });
});

function closePoster(){
  posterModal.classList.remove("show");
  posterFull.removeAttribute("src");
}

document.querySelector(".poster-close").addEventListener("click",closePoster);
document.querySelector(".poster-modal-bg").addEventListener("click",closePoster);
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && posterModal.classList.contains("show")) closePoster();
});
