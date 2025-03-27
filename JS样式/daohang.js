$(document).ready(function () {
    // 页面加载时从 localStorage 获取当前选中项的索引
    var selectedIndex = localStorage.getItem('selectedMenuItem');
    if (selectedIndex) {
        updateSlidePosition(selectedIndex);
    }

    // 点击菜单项时记录索引并设置动画位置
    $("#nav a").on("click", function () {
        var index = $(this).parent().index() - 2;
        localStorage.setItem('selectedMenuItem', index);
        updateSlidePosition(index);
    });

    // 鼠标悬停动画
    $("#nav a").on("mouseover", function () {
        var index = $(this).parent().index() - 2;
        var position = $(this).parent().position();
        var width = $(this).parent().width();
        $("#nav .slide2").css({ opacity: 1, left: position.left, width: width }).addClass("squeeze");
    });

    // 鼠标移出动画
    $("#nav a").on("mouseout", function () {
        $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
    });

    // 窗口大小改变时更新动画位置
    $(window).on("resize", function () {
        var selectedIndex = localStorage.getItem('selectedMenuItem');
        if (selectedIndex) {
            updateSlidePosition(selectedIndex);
        }
    });

    // 更新动画位置的函数
    function updateSlidePosition(index) {
        var selectedItem = $("#nav li:nth-of-type(" + (parseInt(index) + 3) + ") a");
        var position = selectedItem.parent().position();
        var width = selectedItem.parent().width();
        $("#nav .slide1").css({ opacity: 1, left: position.left, width: width });
    }
});