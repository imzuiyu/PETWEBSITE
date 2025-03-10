document.addEventListener('DOMContentLoaded', function () {
    // 左侧悬停下拉列表
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

    // 发布图文！！！输入计数功能，超过1000字禁止输入
    const imgtextarea = document.getElementById('imginputTextarea');
    const countText = document.getElementById('countText');
    const maxLength = 1000;

    imgtextarea.addEventListener('input', function () {
        const currentLength = this.value.length;
        if (currentLength > maxLength) {
            this.value = this.value.slice(0, maxLength);
            countText.classList.add('exceed');
        } else {
            countText.classList.remove('exceed');
        }
        countText.textContent = `${this.value.length}/${maxLength}字`;
    });
    const fileInput = document.getElementById('fileInput');
    const thumbnailContainer = document.querySelector('.photo .thumbnail-inner');
    const maxFiles = 9;
    // 发布文章！！！输入计数功能，超过20字禁止输入
    const textarea = document.getElementById('inputTextarea');
    const countText2 = document.getElementById('countText2');
    const maxLength2 = 20;

    textarea.addEventListener('input', function () {
        const currentLength = this.value.length;
        if (currentLength > maxLength2) {
            this.value = this.value.slice(0, maxLength2);
            countText2.classList.add('exceed');
        } else {
            countText2.classList.remove('exceed');
        }
        countText2.textContent = `${this.value.length}/${maxLength2}字`;
    });

    const text = document.getElementById('contentTextarea');
    const wordCountSpan = document.getElementById('wordCount');

    text.addEventListener('input', function () {
        const currentLength = this.value.length;
        wordCountSpan.textContent = `正文字数 ${currentLength}`;
    });

    // 处理文件选择
    fileInput.addEventListener('change', handleFiles);
    // 处理拖放
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    document.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles({ target: { files } });
    });

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length + thumbnailContainer.children.length > maxFiles) {
            alert(`最多只能上传${maxFiles}个文件！`);
            return;
        }

        Array.from(files).forEach(file => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.draggable = true;
            thumbnail.style.position = 'relative';

            if (file.type.startsWith('image/')) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                thumbnail.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.controls = true;
                video.src = URL.createObjectURL(file);
                thumbnail.appendChild(video);
            }

            // 添加删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                thumbnail.remove();
            });
            thumbnail.appendChild(deleteBtn);

            // 拖动功能
            let startX, startY;
            thumbnail.addEventListener('mousedown', (e) => {
                const rect = thumbnail.getBoundingClientRect();
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;
            });
            document.addEventListener('mousemove', (e) => {
                if (startX !== undefined && startY !== undefined) {
                    const x = e.clientX - startX;
                    const y = e.clientY - startY;
                    thumbnail.style.left = x + 'px';
                    thumbnail.style.top = y + 'px';
                    thumbnail.style.position = 'absolute';
                }
            });
            document.addEventListener('mouseup', () => {
                startX = startY = undefined;
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    }

    // 获取“确定”按钮
    const confirmBtn = document.getElementById('confirmBtn');
    const customPopup = document.querySelector('.custom-popup');
    const popupConfirm = document.querySelector('.confirm-btn');
    const popupCancel = document.querySelector('.cancel-btn');

    confirmBtn.addEventListener('click', () => {
        customPopup.style.display = 'block'; // 显示自定义弹窗
    });

    // 自定义弹窗的确认逻辑
    popupConfirm.addEventListener('click', () => {
        alert('执行真实发布逻辑'); // 此处替换为实际发布代码
        customPopup.style.display = 'none';
    });

    // 关闭弹窗
    popupCancel.addEventListener('click', () => {
        customPopup.style.display = 'none';
    });

    // 新增切换功能
    const publishImageVideoLink = document.querySelector('.banner ul li:first-child a');
    const publishArticleLink = document.querySelector('.banner ul li:nth-child(2) a');
    const draftBoxLink = document.querySelector('.banner ul li:nth-child(3) a');
    const change1 = document.querySelector('.change1');
    const change2 = document.querySelector('.change2');
    const change3 = document.querySelector('.change3');
    const hr1 = document.querySelector('.banner ul li:first-child hr');
    const hr2 = document.querySelector('.banner ul li:nth-child(2) hr');
    const hr3 = document.querySelector('.banner ul li:nth-child(3) hr');
    const publishImageVideoLi = document.querySelector('.banner ul li:first-child');
    const publishArticleLi = document.querySelector('.banner ul li:nth-child(2)');
    const draftBoxLi = document.querySelector('.banner ul li:nth-child(3)');

    publishImageVideoLink.addEventListener('click', function (e) {
        e.preventDefault();
        change1.style.display = 'block';
        change2.style.display = 'none';
        change3.style.display = 'none';
        hr1.style.display = 'block';
        hr2.style.display = 'none';
        hr3.style.display = 'none';
        publishImageVideoLi.classList.add('active2');
        publishArticleLi.classList.remove('active2');
        draftBoxLi.classList.remove('active2');
    });

    publishArticleLink.addEventListener('click', function (e) {
        e.preventDefault();
        change1.style.display = 'none';
        change2.style.display = 'block';
        change3.style.display = 'none';
        hr1.style.display = 'none';
        hr2.style.display = 'block';
        hr3.style.display = 'none';
        publishImageVideoLi.classList.remove('active2');
        publishArticleLi.classList.add('active2');
        draftBoxLi.classList.remove('active2');
    });

    draftBoxLink.addEventListener('click', function (e) {
        e.preventDefault();
        change1.style.display = 'none';
        change2.style.display = 'none';
        change3.style.display = 'block';
        hr1.style.display = 'none';
        hr2.style.display = 'none';
        hr3.style.display = 'block';
        publishImageVideoLi.classList.remove('active2');
        publishArticleLi.classList.remove('active2');
        draftBoxLi.classList.add('active2');
    });
})