<template>
  <div>

    <div id="example-table"></div>
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

      //trigger download of data.xlsx file
      document.getElementById("download-xlsx").addEventListener("click", function(){
        table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
      });
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