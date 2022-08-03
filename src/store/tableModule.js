export default {
    state: {
        columns:[
            {title:"Обозначение", field:"lbl", resizable:true, formatter:"textarea"},
            {title:"Полное название", field:"nameFull", resizable:true, formatter:"textarea"},
            {title:"Юридический адрес", field:"address", resizable:true, formatter:"textarea"},
            {title:"ИНН", field:"inn", resizable:true},
            {title:"КПП", field:"kpp", resizable:true},
            {title:"Укрупненный перечень товаров/услуг", field:"listWork", resizable:true, formatter:"textarea"},
        ]
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
        }
    },
    getters: {
        getAllColumns(state){
            return state.columns;
        }
    },
    actions: {},
}