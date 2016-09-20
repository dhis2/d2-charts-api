const typeMap = new Map([
    ['area', 'stackedarea']
]);

export default function (type) {
    return (typeMap.get(type) || type).toLowerCase();
};