<template>
  <v-dialog
      v-model="dialog"
      width="800"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-title
          v-bind="attrs"
          v-on="on"
      >
        Выбрать столбцы
      </v-list-item-title>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Выбрать столбцы
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
              cols="5"
          >
            <v-card>
              <h4 style="text-align: center; margin-top: 10px;">Не показывать</h4>
              <v-list dense style="border: 1px solid #ccc; margin-top: 10px" class="max-v-list-height">
                <v-list-item-group
                    v-model="selectedInvisibleColumns"
                    multiple
                >
                  <v-list-item
                      v-for="(invisibleColumn, i) in invisibleColumns"
                      :key="`invisibleColumn-${i}`"
                      :value="invisibleColumn"
                      active-class="red--text"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title v-text="invisibleColumn.title"></v-list-item-title>
                      </v-list-item-content>
                    </template>

                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col
              cols="1"
          style="padding-left: 0">
            <v-btn class="icon-btn" @click="allVisible">
              <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
            <v-btn class="icon-btn" @click="addToVisible">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn class="icon-btn" @click="addToInvisible">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn class="icon-btn" @click="allInvisible">
              <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
          </v-col>

          <v-col
              cols="5"
          >
            <v-card>
              <h4 style="text-align: center; margin-top: 10px;">Показать в представлении</h4>
              <v-list dense style="border: 1px solid #ccc; margin-top: 10px" class="max-v-list-height">
                <v-list-item-group
                    v-model="selectedVisibleColumns"
                    multiple
                >
                  <v-list-item
                      v-for="(visibleColumn, i) in visibleColumns"
                      :key="`visibleColumn-${i}`"
                      :value="visibleColumn"
                      active-class="blue--text"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title v-text="visibleColumn.title"></v-list-item-title>
                      </v-list-item-content>
                    </template>

                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="dialog = false"
        >
          Отмена
        </v-btn>
        <v-btn
            @click="applySettings"
        >
          Применить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ColumnSelectionDialog",
  data() {
    return {
      dialog: false,
      invisibleColumns: this.$store.getters.getInvisibleColumns,
      selectedInvisibleColumns: [],
      visibleColumns: this.$store.getters.getVisibleColumns,
      selectedVisibleColumns: [],
    }
  },
  methods: {
    deleteItems(array, items){
      items.forEach(function(item) {
        const i = array.indexOf(item);
        if (i > -1) {
          array.splice(i, 1);
        }
      });
    },
    allVisible(){
      this.visibleColumns.push(...this.invisibleColumns);
      this.invisibleColumns = [];
    },
    addToVisible(){
      this.visibleColumns.push(...this.selectedInvisibleColumns);
      this.deleteItems(this.invisibleColumns, this.selectedInvisibleColumns);
      this.selectedInvisibleColumns = [];
    },
    addToInvisible(){
      this.invisibleColumns.push(...this.selectedVisibleColumns);
      this.deleteItems(this.visibleColumns, this.selectedVisibleColumns);
      this.selectedVisibleColumns = [];
    },
    allInvisible(){
      this.invisibleColumns.push(...this.visibleColumns);
      this.visibleColumns = [];
    },
    applySettings(){
      console.log(this.visibleColumns);
      this.$store.commit("changeVisibility", this.visibleColumns);
      this.dialog = false;
      this.$store.commit("changeKey");
    }
  }
}
</script>

<style scoped>
.icon-btn {
  margin-top: 10px;
}
.max-v-list-height {
  height: 200px;
  overflow-y: auto;
}
</style>