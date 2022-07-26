<template>
  <v-data-table
      :headers="headers"
      :items="contractors"
      :items-per-page="50"
      class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "ContractorList",
  props: {
    contractors: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.v-data-table {
  border: 1px solid #ccc;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;;
  font-size: 12px;
}
.v-data-table > .v-data-table__wrapper > table > thead {
  background-color: #5ea97c;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
  color: white !important;
  border: 1px solid #ccc;
}
</style>