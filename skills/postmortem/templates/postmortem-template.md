---
title: "<short bug title>"
type: postmortem
status: closed
date: "<YYYY-MM-DD>"
tags: [bugfix, postmortem]
---

# Postmortem: <short bug title>

## Summary
一句话说明问题是什么、影响了什么。

## Trigger
这个问题是怎么被发现的？
- 用户反馈 / 测试失败 / 监控报警 / 本地复现 / 代码审查发现

## Impact
影响范围是什么？
- 哪些用户 / 页面 / 流程 / 环境受到影响
- 严重程度如何

## Expected Behavior
原本应该发生什么。

## Actual Behavior
实际发生了什么。

## Root Cause
根因是什么。

尽量写到“为什么会错”，不要只写表面现象。
如果有多层原因，可以分层写：
- direct cause
- contributing factors
- missing guardrails

## Fix
做了什么修改来修复问题。
- code changes
- config changes
- data repair
- rollback / mitigation

## Verification
如何确认修复有效。
- 测试方式
- 复现步骤
- 自动化测试
- 手动验证
- 线上观察

## Prevention / Follow-ups
为了避免再次发生，后续要做什么。
- 增加测试
- 增加监控
- 增加校验
- 改进 review checklist
- 文档更新

## Changed Files
- path/to/file1
- path/to/file2

## Notes
补充信息、上下文、限制、未解决边角问题。
