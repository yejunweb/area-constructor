## 地区JSON生成

### 举个栗子

```
node app.js key=name value=秀华社区居民委员会
```

输出：
```json
[
    {
        "code": "460105001001",
        "name": "秀华社区居民委员会",
        "children": []
    }
]
```

### 可选参数

| 参数名称      | 类型          | 描述                                            |
| ------------ | ------------ | ----------------------------------------------- |
| level        | Number       | 从匹配项开始，包含匹配项的递归级别，默认返回全部子集 |
| key          | String       | 匹配键值，默认 name                               |
| value        | Array        | 匹配值，默认必填                                  |