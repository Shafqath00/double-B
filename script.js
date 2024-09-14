const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper span");


let isDragstar = false, prevPagex, prevScrollLeft, postionDiff;



function showHideIcons(){
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        showHideIcons(() => showHideIcons(), 60);
    });
});

function autoSlide() {
    postionDiff = Math.abs(postionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - postionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += postionDiff > firstImgWidth / 3 ? valDifference : -postionDiff;
    }
    carousel.scrollLeft -= postionDiff > firstImgWidth / 3 ? valDifference : -postionDiff;

}

function dragstar(e) {
    isDragstar = true;
    prevPagex = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

function dragging() {
    if (!isDragstar) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    postionDiff = (e.pageX || e.touches[0].pageX) - prevPagex;
    carousel.scrollLeft = prevScrollLeft - postionDiff;
    showHideIcons();
}

function dragstop() {
    isDragstar = false;
    carousel.classList.remove("dragging");
    autoSlide();
}


carousel.addEventListener("mousedown", dragstar);
carousel.addEventListener("touchstart", dragstar);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragstop);
carousel.addEventListener("mouseleave", dragstop);
carousel.addEventListener("touchleave", dragstop);