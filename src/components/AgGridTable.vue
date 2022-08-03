<template>
  <ag-grid-vue
      class="ag-theme-balham"
      style="height: 500px"
      :columnDefs="columnDefs"
      :rowData="contractors"
      :defaultColDef="defaultColDef"
      animateRows="true"
      v-if="show"
  >
  </ag-grid-vue>
</template>

<script>
import {AgGridVue} from 'ag-grid-vue';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default {
  name: "AgGridTable",
  components: {
    AgGridVue
  },
  props: {
    columnDefs: {
      type: Array,
      required: true
    },
    contractors: {
      type: Array,
      required: true
    },
    defaultColDef: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>