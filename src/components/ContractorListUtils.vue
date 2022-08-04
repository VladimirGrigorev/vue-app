<template>
  <v-form>
    <v-container class="contractor-list-utils" fluid>
      <v-row style="display:flex; align-items: center;">
<!--        <v-col-->
<!--            cols="3"-->
<!--        >-->
<!--          <v-text-field-->
<!--              style="border-radius: 6px; margin: 8px 25px 0 20px"-->
<!--              background-color="white"-->
<!--              height="38px"-->
<!--              label="Поиск..."-->
<!--              v-model="searchQuery"-->
<!--          ></v-text-field>-->
<!--          <v-row style="display:flex; align-items: center;">-->
<!--            <v-col-->
<!--                cols="6"-->
<!--                style="margin-top: 25px;"-->
<!--              >-->
<!--              <v-select-->
<!--                  style="border-radius: 10px 0 0 10px !important;"-->
<!--                  :items="$store.getters.getColumnsTitle"-->
<!--                  v-model="selectColumn"-->
<!--                  prepend-icon="mdi-magnify"-->
<!--                  dense-->
<!--                  solo-->
<!--              ></v-select>-->
<!--            </v-col>-->
<!--            <v-col-->
<!--                cols="6"-->
<!--            >-->
<!--              <v-text-field-->
<!--                  style="border-radius: 6px; margin: 8px 0 0 25px"-->
<!--                  background-color="white"-->
<!--                  height="38px"-->
<!--                  label="Поиск..."-->
<!--                  v-model="searchQuery"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-col>-->

        <v-col
            cols="1"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  small
                  style="border: 1px solid #ccc; margin-left: 30px"
                  height="30px"
                  v-bind="attrs"
                  v-on="on"
              >
                Действия
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <ColumnSelectionDialog />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col>
          <div>
            <v-btn
                small
                style="border: 1px solid #ccc; margin-left: 30px"
                id="download-xlsx"
                height="30px"
            >
              Скачать XLSX
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import ColumnSelectionDialog from "@/components/ColumnSelectionDialog";

export default {
  name: "ContractorListUtils",
  components: {ColumnSelectionDialog},
  data() {
    return {
      searchQuery: '',
      contractors: [],
      selectColumn: 'Обозначение'
    }
  },
  methods: {
    async searchContractors() {
      try {
        const response = await axios.post(
            `https://open-etp-backend.inlinegroup-c.ru/Open-ETP/contractor/filter/?page=${this.page}&size=${this.size}`,
            {
              "logic": "and",
              "cond": [
                {
                  "filter": {
                    "logic": "or",
                    "cond": [
                      {
                        "field": "lbl",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      },
                      {
                        "field": "nameFull",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      },
                      {
                        "field": "address",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      },
                      {
                        "field": "inn",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      },
                      {
                        "field": "kpp",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      },
                      {
                        "field": "listWork",
                        "operator": "like",
                        "value": "%" + this.searchQuery + "%"
                      }
                    ]
                  }
                }
              ]
            }
        );
        this.contractors = response.data.content;
        this.$emit('searchResult', this.contractors)
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  watch: {
    searchQuery() {
      this.searchContractors();
    }
  }
}
</script>

<style scoped>
.contractor-list-utils{
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: rgb(202, 238, 218);
}
.col{
  padding: 0;
}
</style>