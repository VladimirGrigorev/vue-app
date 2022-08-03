<template>
  <v-form>
    <v-container class="contractor-list-utils" fluid>
      <v-row>
        <v-col
            cols="2"
            md="2"
        >
          <input class="text-field"
                 v-model="searchQuery"
                 placeholder="Поиск..."
          />
        </v-col>
        <v-col
            cols="3"
            md="3">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
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
  background-color: rgb(202, 238, 218);
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.text-field {
  background-color: white;
  padding: 3px 6px;
  border: 1px solid #ccc;
}
</style>