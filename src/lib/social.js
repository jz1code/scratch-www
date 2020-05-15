module.exports = {};

module.exports.projectUrl = projectId => {
    if (projectId) {
        return `https://sc.jzcode.cn/projects/${projectId}`;
    }
    return '';
};

module.exports.embedHtml = projectId => {
    if (projectId) {
        return `https://sc.jzcode.cn/mobile/${projectId}`;
    }
    return '';
};
