<template>
  <div id="example-table">
  </div>
</template>

<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import  "tabulator-tables/dist/css/tabulator_simple.css";
import axios from "axios";

export default {
  name: "TabulatorTable",
  components: {
    Tabulator
  },
  data() {
    return {
      contractors: [],
      agents: [],
    }
  },
  methods: {
    findAgents(table) {
      table.on("rowClick", async function (e, row) {
        const response = await axios.post(
            `https://open-etp-backend.inlinegroup-c.ru/Open-ETP/jooq/contractor/${row.getData().objectId}/agent/filter/?page=0&size=2000`
        );
        var agents = response.data.content;

        var parentRow = table.searchRows("objectId","=",row.getData().objectId);
        var tempParentRowData = parentRow[0].getData();
        tempParentRowData._children = [];

        var children = [];
        agents.forEach(function(item, index, array) {
          var child = {
            lbl: item.lastName,
            nameFull: item.midName,
            address: item.firstName,
            inn: item.office,
          }
          children.push(child);
        });
        tempParentRowData._children.push(...children);

        parentRow[0].update({_children:tempParentRowData._children});
        table.redraw();
      });
    },

    createTable(){
      var table = new Tabulator("#example-table", {
        // height:500,
        rowHeight:28,
        layout:"fitColumns",
        columns: this.$store.getters.getAllColumns,
        resizableRows : true,
        pagination:true,
        paginationMode:"remote",
        ajaxConfig:"POST",
        ajaxContentType:"application/json",
        paginationSize:20,
        paginationSizeSelector:[5, 10, 20, 50],
        ajaxURL:"https://open-etp-backend.inlinegroup-c.ru/Open-ETP/contractor/filter/",
        ajaxURLGenerator:function(url, config, params){
          return url + "?page=" + (params['page'] - 1) + '&size=' + params['size'];
        },
        dataReceiveParams:{
          "last_page":"totalPages",
          "data":"content"
        },
        dataTree:true,
      });

      this.findAgents(table);
    },

    async getAgents(id) {
      try {
        const response = await axios.post(
            `https://open-etp-backend.inlinegroup-c.ru/Open-ETP/jooq/contractor/${id}/agent/filter/?page=0&size=2000`
        );
        this.agents.push(...response.data.content);
        console.log(this.agents);
        this.contractors[id]._children = this.agents;
        console.log("afa");
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.createTable();
  },
}
</script>

<style>
.tabulator{
  border: 1px solid #ccc !important;
}
.tabulator-col {
  color: white;
  background-color: #5ea97c !important;
  height: 36px;
  padding-top: 4px;
  padding-left: 5px;
}
.tabulator .tabulator-footer .tabulator-page.active {
  color: #5ea97c;
}
</style>