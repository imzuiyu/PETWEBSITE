document.addEventListener('DOMContentLoaded', function () {

    // 全局点击事件监听器
    document.addEventListener('click', function (event) {
        const isClickInsideHoverImg = hoverImg.contains(event.target);
        const isClickInsideDropdown = dropdown.contains(event.target);

        if (!isClickInsideHoverImg && !isClickInsideDropdown) {
            clearTimeout(timeoutId);
            dropdown.style.display = 'none';
        }
    })

    //左侧悬停下拉列表
    const hoverImg = document.getElementById('hoverImg');
    const dropdown = document.querySelector('.dropdown');
    let timeoutId;

    hoverImg.addEventListener('mouseenter', function () {
        // 清除之前的定时器（如果有的话）
        clearTimeout(timeoutId);
        // 显示下拉列表
        dropdown.style.display = 'block';
    });
    hoverImg.addEventListener('mouseleave', function () {
        // 设置一个 5 秒的定时器
        timeoutId = setTimeout(() => {
            dropdown.style.display = 'none';
        }, 3000);
    });

    dropdown.addEventListener('mouseenter', function () {
        // 当鼠标进入下拉列表时，清除定时器，防止下拉列表隐藏
        clearTimeout(timeoutId);
    });

    dropdown.addEventListener('mouseleave', function () {
        // 当鼠标离开下拉列表时，重新设置 5 秒定时器
        timeoutId = setTimeout(() => {
            dropdown.style.display = 'none';
        }, 3000);
    });

    // 评论部分
    // 获取评论按钮元素
    const commentButton = document.getElementById('commentButton');
    // 获取评论列表元素
    const comment = document.getElementById('comment');
    // 获取post-section元素
    const postSection = document.querySelector('.post-section');
    // 获取点赞按钮元素
    const likeButtons = document.querySelectorAll('liked');
    // 获取点赞数量元素
    const likeCounts = document.querySelectorAll('liked-num');
    // 用于存储点赞状态的对象，键为点赞按钮的索引，值为点赞状态（true表示已点赞，false表示未点赞）
    const likeStatus = {};

    // 给点赞按钮添加点击事件监听器
    likeButtons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const countElement = likeCounts[index];
            const currentCount = parseInt(countElement.textContent);
            if (!likeStatus[index]) {
                // 首次点赞
                likeStatus[index] = true;
                countElement.textContent = currentCount + 1;
                // 添加点赞特效，这里以添加类名来实现简单的动画效果为例
                this.classList.add('liked');
                setTimeout(() => {
                    this.classList.remove('liked');
                }, 300);
            } else {
                // 取消点赞
                likeStatus[index] = false;
                if (currentCount > 0) {
                    countElement.textContent = currentCount - 1;
                }
            }
        });
    });

    const input = document.getElementById('input');
    const sendButton = document.getElementById('sendButton');
    const commentList = document.getElementById('commentList');
    // 点击发送按钮事件处理函数
    sendButton.addEventListener('click', function (e) {
        e.preventDefault();
        addComment();
    });
    // 输入框按Enter键事件处理函数
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addComment();
        }
    });
    // 添加评论的函数
    function addComment() {
        const commentText = input.value.trim();
        if (commentText) {
            // 创建新的评论元素
            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            newComment.innerHTML = `
                    <div class="comment-content">
                        <div class="post-header">
                            <img src="../照片/m2.jpg" alt="图片" class="avatar">
                            <div class="text-container">
                                <p>用户名<span class="time">刚刚</span></p>
                                <span class="level">${commentText}</span>
                            </div>
                        </div>
                        <div class="post-interaction">
                            <div class="clicks"><a href="#"><span class="iconfont icon-dianzan"></span><span class="click">点赞</span></a><span class="count">0</span>
                            </div>
                            <div class="clicks"><a href="#" id="commentButton"><span class="iconfont icon-pinglun"></span><span class="click">评论</span></a><span class="count">0</span>
                            </div>
                        </div>
                    </div>
                `;
            // 将新评论添加到评论列表中
            commentList.appendChild(newComment);
            // 清空输入框
            input.value = '';
        }
    }
    //时间切换
    function formatTimeDifference(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffMonth = now.getMonth() - past.getMonth() + (now.getFullYear() - past.getFullYear()) * 12;
        const diffYear = now.getFullYear() - past.getFullYear();
        if (diffMin < 1) {
            return '刚刚';
        } else if (diffHour < 1) {
            return `${diffMin}分钟前`;
        } else if (diffDay < 1) {
            return `${diffHour}小时前`;
        } else if (diffMonth < 1) {
            return `${diffDay}天前`;
        } else if (diffYear < 1) {
            return `${diffMonth}个月前`;
        } else {
            return `${diffYear}年前`;
        }
    }
    function updateCommentTimes() {
        const timeSpans = document.querySelectorAll('.time');
        timeSpans.forEach(span => {
            const timestamp = parseInt(span.dataset.timestamp);
            if (timestamp) {
                span.textContent = formatTimeDifference(timestamp);
            }
        });
    }
    setInterval(updateCommentTimes, 60000);
    // 输入框的焦点事件
    input.addEventListener('click', function () {
        this.classList.add('highlight');
    });
    input.addEventListener('blur', function () {
        this.classList.remove('highlight');
    });
    commentButton.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认行为
        // 评论列表的显示状态
        if (comment.style.display === 'none') {
            comment.style.display = 'block';
            hr.style.display = 'none';
        } else {
            comment.style.display = 'none';
            hr.style.display = 'block';
        }
        postSection.classList.toggle('show-border');
    });

    // 获取“我的文章”和“我的图文”链接元素
    const myArticleLink = document.querySelector('.choose li:nth-of-type(1) a');
    const myImageTextLink = document.querySelector('.choose li:nth-of-type(2) a');
    // 获取文章板块和图文板块元素
    const articleBox = document.querySelector('.article-box');
    const imageBox = document.querySelector('.image-box');
    // 获取对应的 hr 元素
    const myArticleHr = document.querySelector('.choose li:nth-of-type(1) hr');
    const myImageTextHr = document.querySelector('.choose li:nth-of-type(2) hr');

    // 点击“我的文章”切换板块并显示 hr
    myArticleLink.addEventListener('click', function (event) {
        event.preventDefault();
        // 切换 active 类
        document.querySelector('.choose li.active2').classList.remove('active2');
        this.parentElement.classList.add('active2');
        // 切换显示板块
        articleBox.style.display = 'block';
        imageBox.style.display = 'none';
        // 切换 hr 显示状态
        myArticleHr.style.display = 'block';
        myImageTextHr.style.display = 'none';
    });

    // 点击“我的图文”切换板块并显示 hr（保留之前的功能）
    myImageTextLink.addEventListener('click', function (event) {
        event.preventDefault();
        // 切换 active 类
        document.querySelector('.choose li.active2').classList.remove('active2');
        this.parentElement.classList.add('active2');
        // 切换显示板块
        articleBox.style.display = 'none';
        imageBox.style.display = 'block';
        // 切换 hr 显示状态
        myArticleHr.style.display = 'none';
        myImageTextHr.style.display = 'block';
    });
})