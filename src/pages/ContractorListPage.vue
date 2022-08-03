<template>
  <v-container fluid style="padding: 12px">
    <h1>Контрагенты</h1>
    <ContractorListUtils
        @searchResult="updateContractorList"
    />

    <TabulatorTable />
  </v-container>
</template>

<script>
import ContractorList from "@/components/ContractorList";
import axios from "axios";
import ContractorListUtils from "@/components/ContractorListUtils";
import TabulatorTable from "@/components/TabulatorTable";

export default {
  name: "ContractorListPage",
  components: {
    TabulatorTable,
    ContractorListUtils,
    ContractorList
  },
  data() {
    return {
      headers: [
        {text: 'Обозначение', value: 'lbl'},
        {text: 'Полное название', value: 'nameFull'},
        {text: 'Юридический адрес', value: 'address'},
        {text: 'ИНН', value: 'inn'},
        {text: 'КПП', value: 'kpp'},
        {text: 'Укрупненный перечень товаров/услуг', value: 'listWork'},
      ],
      contractors: [],
      page: 0,
      size: 50,
      columnDefs: [
        {field: 'lbl', headerName: 'Обозначение'},
        {field: 'nameFull', headerName: 'Полное название', width: 250},
        {field: 'address', headerName: 'Юридический адрес', width: 250},
        {field: 'inn', headerName: 'ИНН'},
        {field: 'kpp', headerName: 'КПП'},
        {field: 'listWork', headerName: 'Укрупненный перечень товаров/услуг', width: 400},
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      },
    }
  },
  methods: {
    async fetchContractors() {
      try {
        const response = await axios.post(
            `https://open-etp-backend.inlinegroup-c.ru/Open-ETP/contractor/filter/?page=${this.page}&size=${this.size}`
        );
        this.contractors = response.data.content;
      } catch (e) {
        alert('Ошибка')
      }
    },
    updateContractorList(contractors) {
      this.contractors = contractors;
    }
  },
  mounted() {
    this.fetchContractors();
  },
}
</script>

<style>
h1 {
  margin: 0 0 5px 0;
  color: #42b983;
  font-size: 16px;
}
</style>