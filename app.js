const fs = require('fs');
const path = require('path');
const process = require('process');

// 依据层级返回节点
const levelFilter = (arr, level, key, value) => {
    const targetOptions = [];
    const targetFilter = childArr => {
        for (let i = 0; i < childArr.length; i++) {
            if (childArr[i]?.[key] === value) {
                targetOptions.push(childArr[i]);
                break;
            } else if (childArr[i]?.children?.length) {
                targetFilter(childArr[i].children);
            }
        }
    };
    const childFilter = (childArr, childLevel = 0) => {
        return childArr.map(v => ({
            ...v,
            children: v?.children?.length && childLevel + 1 <= level ? childFilter(v.children, childLevel + 1) : [],
        }));
    };
    targetFilter(childFilter(arr));
    return targetOptions;
};

// 获取命令行参数对象
const getOption = () => {
    const arr = process.argv.slice(2);
    const r = arr.reduce((pre, item) => {
        if (item.indexOf('=') !== -1) {
            return [...pre, item.split('=')];
        }
        return pre;
    }, []);
    const params = Object.fromEntries(r);
    return params; // 返回参数对象
};

const { level, key, value } = {
    level: 99, // 递归等级
    key: 'name', // 匹配键值
    value: '海南省', // 匹配值
    ...getOption(),
};

fs.readFile(path.join(__dirname, './areaList.json'), 'utf-8', (err, data) => {
    if (err) throw err;
    const targetData = levelFilter(JSON.parse(data), level, key, value);
    fs.writeFile(path.join(__dirname, './target.json'), JSON.stringify(targetData, null, 4), err => {
        if (err) throw err;
        console.log('Construct Success!');
    });
});
