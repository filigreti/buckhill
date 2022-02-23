<template>
  <main>
    <v-app id="inspire">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:top>
          <div class="d-flex header-top">
            <div
              style="width: 100%"
              class="d-flex w-100 justify-space-between align-center pr-8 first-header"
            >
              <div>All products</div>
              <div>
                <div>
                  <v-btn height="35" class="primary">
                    <v-icon left small>mdi-plus</v-icon>
                    Add new product
                  </v-btn>
                </div>
              </div>
            </div>
            <div @click="expand = !expand" class="filter d-flex second-header">
              Filter
              <v-icon class="filter-icon" :class="{ rotate: expand }"
                >mdi-chevron-down</v-icon
              >
            </div>
          </div>
          <v-expand-transition>
            <div v-show="expand" class="filter-opt">
              <v-row class="d-flex">
                <v-col lg="4">
                  <v-text-field
                    outlined
                    placeholder="Search products"
                    append-icon="mdi-magnify"
                    single-line
                    class="black--text text-filter input-size"
                  ></v-text-field>
                </v-col>
                <v-col lg="3">
                  <v-text-field
                    outlined
                    placeholder="Search products"
                    append-icon="mdi-magnify"
                    single-line
                    class="black--text text-filter input-size"
                  ></v-text-field>
                </v-col>
                <v-col lg="4">
                  <v-text-field
                    outlined
                    class="black--text text-filter input-size"
                    placeholder="Search products"
                    append-icon="mdi-magnify"
                    single-line
                  ></v-text-field>
                </v-col>
                <v-col align="center" class="text-filter-button" lg="1">
                  <v-btn color="gray--text" elevation="0"> Reset </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </main>
</template>

<script>
export default {
  data: () => ({
    expand: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "", value: "actions", sortable: false },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
  }),
};
</script>

<style>
.header-top {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  padding-left: 1.5rem;
}
th,
td {
  padding-left: 1.5rem !important;
}
.filter {
  border-left: thin solid rgba(0, 0, 0, 0.12);
  opacity: 0.7;
  font-size: 0.85rem;
}
.first-header {
  padding: 1.5rem 0;
}
.second-header {
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.filter-opt {
  background: #fafafa !important;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1.5rem;
}
.rotate {
  transform: rotate(180deg);
}
.filter-icon {
  margin-top: 2px;
}
.text-filter {
  margin-top: 1.6rem !important;
}
.text-filter-button {
  margin-top: 2.2rem !important;
}
</style>
