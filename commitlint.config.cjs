/**
 * feat：新功能
 * perf：优化性能
 * fix：修补某功能的bug
 * refactor：重构某个功能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 * test：增加或更新测试
 */

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'perf', 'fix', 'refactor', 'style', 'docs', 'chore', 'test']],
        'type-case': [0],
        'type-empty': [2, 'never'],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
    }
}
