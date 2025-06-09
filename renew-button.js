(function() {
    // 定义一个对象，存储不同VPS ID对应的续费链接
    // 请根据你的实际VPS ID和续费链接进行修改
    var vpsLinks = {
        '1': 'https://your.billing.panel/renew/vps1_link',  // VPS ID 为 1 的续费链接
        '2': 'https://your.billing.panel/renew/vps2_link',  // VPS ID 为 2 的续费链接
        '3': 'https://your.billing.panel/renew/vps3_link',  // VPS ID 为 3 的续费链接
        // ... 可以继续添加更多VPS的ID和链接
    };

    // 获取当前页面URL中的VPS ID
    function getVpsIdFromUrl() {
        var path = window.location.pathname;
        var parts = path.split('/');
        // 假设URL格式是 /server/ID 或 /dashboard/server/ID
        // 我们需要找到数字部分的ID
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === 'server' && i + 1 < parts.length) {
                var id = parseInt(parts[i + 1]);
                if (!isNaN(id)) {
                    return String(id); // 返回字符串形式的ID，因为我们vpsLinks的键是字符串
                }
            }
        }
        return null; // 如果没有找到ID
    }

    var currentVpsId = getVpsIdFromUrl();

    // 只有在服务器详情页面并且找到了VPS ID，并且该ID在我们的映射中存在时才显示按钮
    if (currentVpsId && vpsLinks[currentVpsId]) {
        var renewButton = document.createElement('a');

        renewButton.innerText = '续费服务';
        renewButton.href = vpsLinks[currentVpsId]; // 设置为当前VPS的续费链接

        // 设置按钮的样式 (同上，可根据需要调整)
        renewButton.style.position = 'fixed';
        renewButton.style.bottom = '20px';
        renewButton.style.right = '20px';
        renewButton.style.backgroundColor = '#4CAF50';
        renewButton.style.color = 'white';
        renewButton.style.padding = '10px 15px';
        renewButton.style.borderRadius = '5px';
        renewButton.style.textDecoration = 'none';
        renewButton.style.zIndex = '1000';
        renewButton.style.cursor = 'pointer';
        renewButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        renewButton.style.transition = 'background-color 0.3s ease';

        renewButton.onmouseover = function() {
            this.style.backgroundColor = '#45a049';
        };
        renewButton.onmouseout = function() {
            this.style.backgroundColor = '#4CAF50';
        };

        document.body.appendChild(renewButton);

        // 如果需要，可以为按钮添加点击事件
        renewButton.onclick = function(event) {
            // 可以在新标签页打开
            window.open(this.href, '_blank');
            event.preventDefault(); // 阻止默认的链接跳转，让window.open生效
        };

    } else {
        // 如果不在服务器详情页或者没有找到对应的ID，不显示按钮
        console.log("未找到当前VPS ID或未配置对应的续费链接，不显示续费按钮。");
    }

})();
