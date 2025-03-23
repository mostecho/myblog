let selectors = {
  id: document.querySelector("#shell"),
  item: document.querySelectorAll("#shell .item"),
  activeClass: "item--active",
  img: ".img"
};
// 将第一个时间轴项目激活，并设置时间轴背景图片为第一个项目的图片
selectors.item[0].classList.add(selectors.activeClass);
selectors.id.style.backgroundImage = `url(${selectors.item[0].querySelector(selectors.img).getAttribute("src")})`;
// 获取时间轴项目的总数
let timeLength = selectors.item.length;
// 当页面滚动时触发滚动事件
window.addEventListener("scroll", function () {
  let max, min;
  // 获取页面滚动距离
  let pos = window.scrollY;
  selectors.item.forEach(function (item, i) {
    // 获取当前时间轴项目的最小和最大高度
    min = item.offsetTop;
    max = item.offsetHeight + item.offsetTop;
    // 如果滚动到最后一个项目，并且超过了当前项目高度的一半，
    // 则将最后一个项目设置为激活状态，并设置背景图片为最后一个项目的图片
    if (i === timeLength - 2 && pos > min + item.offsetHeight / 2) {
      selectors.item.forEach(function (item) {
        item.classList.remove(selectors.activeClass);
      });
      selectors.id.style.backgroundImage = `url(${selectors.item[timeLength - 1].querySelector(selectors.img).getAttribute("src")})`;
      selectors.item[timeLength - 1].classList.add(selectors.activeClass);
    }
    // 如果当前滚动位置在当前项目的最小和最大高度之间
    // 则将当前项目设置为激活状态，并设置背景图片为当前项目的图片
    else if (pos <= max - 10 && pos >= min) {
      selectors.id.style.backgroundImage = `url(${item.querySelector(selectors.img).getAttribute("src")})`;
      selectors.item.forEach(function (item) {
        item.classList.remove(selectors.activeClass);
      });
      item.classList.add(selectors.activeClass);
    }
  });
});