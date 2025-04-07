$(document).ready(function () {
    // 缓存常用DOM元素
    var $nav = $("#nav");
    var $slide1 = $nav.find(".slide1");
    var $slide2 = $nav.find(".slide2");
    var $navItems = $nav.find("li");

    // 页面加载时从 localStorage 获取当前选中项的索引
    var selectedIndex = localStorage.getItem('selectedMenuItem');
    if (selectedIndex) {
        updateSlidePosition(selectedIndex);
    }

    // 使用事件委托处理点击和悬停事件
    $nav.on("click", "a", function() {
        var index = $navItems.index($(this).parent()) - 2;
        localStorage.setItem('selectedMenuItem', index);
        updateSlidePosition(index);
    });

    $nav.on({
        mouseover: function() {
            var index = $navItems.index($(this).parent()) - 2;
            var $parent = $(this).parent();
            $slide2.css({ 
                opacity: 1, 
                left: $parent.position().left, 
                width: $parent.width() 
            }).addClass("squeeze");
        },
        mouseout: function() {
            $slide2.css({ opacity: 0 }).removeClass("squeeze");
        }
    }, "a");

    // 添加防抖的resize事件处理
    var resizeTimer;
    $(window).on("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var selectedIndex = localStorage.getItem('selectedMenuItem');
            if (selectedIndex) {
                updateSlidePosition(selectedIndex);
            }
        }, 250);
    });

    function updateSlidePosition(index) {
        var $selectedItem = $navItems.eq(parseInt(index) + 2).find("a");
        var $parent = $selectedItem.parent();
        $slide1.css({ 
            opacity: 1, 
            left: $parent.position().left, 
            width: $parent.width() 
        });
    }
});