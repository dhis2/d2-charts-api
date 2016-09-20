export default function(type) {
    return type === 'gauge' ? {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: '#F1F1F1',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    } : undefined;
}