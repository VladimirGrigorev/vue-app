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
        setColumns(state, payload){
            state.columns = payload
        },
    },
    getters: {
        getAllColumns(state){
            return state.columns;
        }
    },
    actions: {},
}