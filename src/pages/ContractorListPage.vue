<template>
  <v-container fluid>
    <h1>Контрагенты</h1>
    <ContractorListUtils
        @searchResult="updateContractorList"
    />
    <ContractorList
        :headers="headers"
        :contractors="contractors"
    />
  </v-container>
</template>

<script>
import ContractorList from "@/components/ContractorList";
import axios from "axios";
import ContractorListUtils from "@/components/ContractorListUtils";

export default {
  name: "ContractorListPage",
  components: {
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
    updateContractorList(contractors){
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