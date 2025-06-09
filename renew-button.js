function createRenewButton() {
    try {
        console.log('续费按钮脚本开始执行');

        // 定义续费链接
        const affLinks = {
            1: { link: 'https://app.cloudcone.com/?ref=11880' },
            2: { link: 'https://my.racknerd.com/aff.php?aff=12190&a=add&pid=810' },
            3: { link: 'https://cloud.colocrossing.com/aff.php?aff=780&pid=23' },
            5: { link: 'https://cloud.colocrossing.com/aff.php?aff=780&pid=23' },
            6: { link: 'https://app.alice.ws/dashboard' },
            7: { link: 'https://my.racknerd.com/aff.php?aff=12190&a=add&pid=880' },
            8: { link: 'https://rarecloud.io/clients/aff.php?aff=585&pid=3' },
            'default': { link: 'https://example.com/renew/default' }
        };

        // 尝试从表格获取 VPS ID
        let firstVpsId = null;
        const rows = document.querySelectorAll('tr');
        console.log('找到的表格行数量:', rows.length);
        for (const row of rows) {
            let nodeId = row.id ? row.id.substring(1) : null;
            if (nodeId && affLinks[nodeId]) {
                firstVpsId = nodeId;
                console.log('从表格获取 VPS ID:', firstVpsId);
                break;
            }
        }

        // 尝试从 URL 获取 VPS ID
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('vpsId')) {
            firstVpsId = urlParams.get('vpsId');
            console.log('从 URL 获取 VPS ID:', firstVpsId);
        }

        // 选择续费链接
        const renewUrl = firstVpsId && affLinks[firstVpsId] ? affLinks[firstVpsId].link : affLinks['default'].link;
        console.log('续费链接:', renewUrl);

        // 创建续费按钮
        const renewButton = document.createElement('a');
        renewButton.href = renewUrl;
        renewButton.target = '_blank';
        renewButton.textContent = '续费';
        renewButton.style.cssText = 'position: fixed !important; bottom: 20px !important; right: 20px !important; background-color: #21ba45 !important; color: white !important; padding: 8px 16px !important; border-radius: 4px !important; text-decoration: none !important; z-index: 10000 !important; font-size: .9rem !important;';
        document.body.appendChild(renewButton);
        console.log('续费按钮已添加');
    } catch (error) {
        console.error('续费按钮错误:', error.message);
    }
}

// 尝试在 DOM 加载后立即执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 触发');
    setTimeout(createRenewButton, 1000); // 延迟 1 秒以等待动态 DOM
});

// 监听 DOM 变化以应对动态加载
const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('body')) {
        console.log('检测到 DOM 变化，尝试创建按钮');
        createRenewButton();
        obs.disconnect(); // 执行一次后停止观察
    }
});
observer.observe(document.documentElement, { childList: true, subtree: true });
