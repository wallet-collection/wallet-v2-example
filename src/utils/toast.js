/**
 * 原生JS实现AntD风格的Toast提示
 * 功能：支持success/error/warning三种类型，自动消失
 * 使用方法：
 *   Toast.success('操作成功')
 *   Toast.error('操作失败', 5000) // 5秒后消失
 *   Toast.warning('警告')
 */

// ====================== 样式定义 ======================
const style = `
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}
.toast-item {
  min-width: 200px;
  padding: 10px 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease-out forwards;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}
.toast-success {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}
.toast-error {
  background: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
}
.toast-warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  color: #faad14;
}
.toast-icon {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}
`;

// ====================== 图标定义 ======================
const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠'
};

// ====================== 核心逻辑 ======================
let container = null;

const getContainer = () => {
    if (!container) {
        // 创建容器
        container = document.createElement('div');
        container.className = 'toast-container';

        // 注入样式
        const styleEl = document.createElement('style');
        styleEl.textContent = style;
        document.head.appendChild(styleEl);

        document.body.appendChild(container);
    }
    return container;
};

const showToast = (type, content, duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span>${content}</span>
  `;

    const container = getContainer();
    container.appendChild(toast);

    // 自动销毁
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        toast.addEventListener('animationend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
                // container = null;
            }
        });
    }, duration);
};

// ====================== 对外接口 ======================
export const Toast = {
    success: (content, duration) => showToast('success', content, duration),
    error: (content, duration) => showToast('error', content, duration),
    warning: (content, duration) => showToast('warning', content, duration)
};

export default Toast;