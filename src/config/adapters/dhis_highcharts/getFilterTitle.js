import isArray from 'd2-utilizr/lib/isArray';
import { ouIdHelper } from '@dhis2/d2-ui-analytics'
import i18n from '@dhis2/d2-i18n'

export default function (filters, metaData) {
    let title;
    
    if (isArray(filters) && filters.length) {
        title = '';
        
        let filterItems;
        let i;
        let l;

        filters.forEach((filter, index, array) => {
            const isOuFilterWithLevel = filter.dimension === 'ou' ? filter.items.some(item => ouIdHelper.hasLevelPrefix(item.id)) : false;
            const isOuFilterWithGroups = filter.dimension === 'ou' ? filter.items.some(item => ouIdHelper.hasGroupPrefix(item.id)) : false;

            if (isOuFilterWithLevel || isOuFilterWithGroups) {
                const titleParts = [];

                if (isOuFilterWithGroups) {
                    titleParts.push(getOuFilterTitle(filter.items, metaData, false))
                }

                if (isOuFilterWithLevel) {
                    titleParts.push(getOuFilterTitle(filter.items, metaData, true))
                }

                title += titleParts.join(' - ')
            } else {
                filterItems = metaData.dimensions[filter.dimension];

                if (isArray(filterItems)) {
                    l = filterItems.length;
                    let id;

                    for (i = 0; i < l; i++) {
                        id = filterItems[i];

                        // if the value is present in items take the name to show from there
                        if (metaData.items[id]) {
                            title += metaData.items[id].name + (i < l - 1 ? ', ' : '');
                        }
                        // otherwise use the values directly
                        // this is a temporary fix to avoid app crashing when using filters with data items in EV
                        else {
                            title += metaData.items[filter.dimension].name + ': ' + filterItems.join(', ');

                            break;
                        }
                    }

                    title += (index < array.length - 1 ? ' - ' : '');
                }
            }
        });
    }

    return title || null;
}

const getOuFilterTitle = (items, metaData, isLevel) => {
    const getNameFromMetadata = id => metaData.items[id] ? metaData.items[id].name : id;

    const dynamicOuItems = items.filter(item => isLevel ? ouIdHelper.hasLevelPrefix(item.id) : ouIdHelper.hasGroupPrefix(item.id));
    const lastItem = dynamicOuItems.length > 1 ? dynamicOuItems.pop() : null;
    const dynamicOuNames = dynamicOuItems.map(item => getNameFromMetadata(ouIdHelper.removePrefix(item.id))).join(', ');

    let allDynamicOuNames;

    if (lastItem) {
        const lastOuName = getNameFromMetadata(ouIdHelper.removePrefix(lastItem.id));
        allDynamicOuNames = `${dynamicOuNames} ${i18n.t('and')} ${lastOuName}`
    } else {
        allDynamicOuNames = dynamicOuNames;
    }
    
    const staticOuNames = items
        .filter(item => !ouIdHelper.hasGroupPrefix(item.id) && !ouIdHelper.hasLevelPrefix(item.id))
        .map(item => getNameFromMetadata(item.id))
        .join(', ');
    
    const joiner = isLevel ? i18n.t('levels in') : i18n.t('groups in');
    return `${allDynamicOuNames} ${joiner} ${staticOuNames}`;
}
