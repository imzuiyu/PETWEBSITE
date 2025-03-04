// 获取轮播图
const carouselImages = document.querySelector('.carousel-images');
const carouselLeft = document.querySelector('.carousel-left');
const carouselRight = document.querySelector('.carousel-right');

let currentIndex = 0; // 当前显示的图片索引

// 切换指定图片
function showImage(index) {
    const offset = -index * 996; // 每张图片的宽度为 996px
    carouselImages.style.transform = `translateX(${offset}px)`;
}

// 切换上一张图片
carouselLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 5) % 5; // 5 是图片总数
    showImage(currentIndex);
});

// 切换下一张图片
carouselRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 5; // 5 是图片总数
    showImage(currentIndex);
});