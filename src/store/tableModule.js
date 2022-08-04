export default {
    state: {
        columns:[
            {title:"Обозначение", field:"lbl", resizable:true, formatter:"textarea", visible: true},
            {title:"Полное название", field:"nameFull", resizable:true, formatter:"textarea", visible: true},
            {title:"Юридический адрес", field:"address", resizable:true, formatter:"textarea", visible: true},
            {title:"ИНН", field:"inn", resizable:true, visible: true},
            {title:"КПП", field:"kpp", resizable:true, visible: true},
            {title:"Укрупненный перечень товаров/услуг", field:"listWork", resizable:true, formatter:"textarea", visible: true},
        ],
        tableKey: 0
    },
    mutations: {
        changeVisibility(state, items){
            state.columns.forEach(function(item) {
                item.visible = false;
            });
            items.forEach(function(item) {
                const i = state.columns.indexOf(item);
                if (i > -1) {
                    state.columns[i].visible = true;
                }
            });
            console.log(state.columns);
        },
        changeKey(state){
            state.tableKey += 1;
        }
    },
    getters: {
        getAllColumns(state){
            return state.columns;
        },
        getVisibleColumns(state){
            var visibleColumns = [];
            console.log(state.columns);
            state.columns.forEach(function(item) {
                if (item.visible === true) {
                    visibleColumns.push(item);
                }
            });
            return visibleColumns;
        },
        getInvisibleColumns(state){
            var invisibleColumns = [];
            state.columns.forEach(function(item) {
                if (item.visible === false) {
                    invisibleColumns.push(item);
                }
            });
            return invisibleColumns;
        },
        getKey(state){
            return state.tableKey;
        },
        getColumnsTitle(state){
            var newArr = ['Все'];
            state.columns.forEach(function(item) {
                newArr.push(item.title);
            });
            return newArr;
        }
    },
    actions: {},
}