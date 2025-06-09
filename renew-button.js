document.addEventListener('DOMContentLoaded', function() {
    try {
        // 定义关联链接
        const affLinks = {
            1: { link: 'https://app.cloudcone.com/?ref=11880' },
            2: { link: 'https://my.racknerd.com/aff.php?aff=12190&a=add&pid=810' },
            3: { link: 'https://cloud.colocrossing.com/aff.php?aff=780&pid=23' },
            5: { link: 'https://cloud.colocrossing.com/aff.php?aff=780&pid=23' },
            6: { link: 'https://app.alice.ws/dashboard' },
            7: { link: 'https://my.racknerd.com/aff.php?aff=12190&a=add&pid=880' },
            8: { link: 'https://rarecloud.io/clients/aff.php?aff=585&pid=3' },
            'default': { link: 'https://example.com/renew/default' } // 默认链接
        };

        // 获取第一个有效 VPS ID
        let firstVpsId = null;
        const rows = document.querySelectorAll('tr');
        for (const row of rows) {
            let nodeId = row.id ? row.id.substring(1) : null;
            if (nodeId && affLinks[nodeId]) {
                firstVpsId = nodeId;
                break;
            }
        }

        // 设置续费按钮链接
        const renewUrl = firstVpsId && affLinks[firstVpsId] ? affLinks[firstVpsId].link : affLinks['default'].link;

        // 创建续费按钮
        const renewButton = document.createElement('a');
        renewButton.href = renewUrl;
        renewButton.target = '_blank';
        renewButton.textContent = '续费';
        renewButton.className = 'ui button green';
        renewButton.style.position = 'fixed';
        renewButton.style.bottom = '20px';
        renewButton.style.right = '20px';
        renewButton.style.zIndex = '1000';
        renewButton.style.padding = '8px 16px';
        renewButton.style.fontSize = '.9rem';
        document.body.appendChild(renewButton);
    } catch (error) {
        console.error('发生错误:', error.message);
    }
});
