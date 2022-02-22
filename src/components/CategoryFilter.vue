<template>
  <main>
    <v-list>
      <v-list-group
        active-class="black--text"
        v-for="item in categories"
        :key="item.title"
        v-model="item.active"
        no-action
        :ripple="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item dense v-for="child in item.items" :key="child.title">
          <v-list-item-content>
            <v-list-item-title>
              <div
                @click="sendRoute(child)"
                class="dim-black d-flex justify-space-between align-center w-100"
              >
                <div>
                  {{ child.title | truncate(20, "...") }}
                </div>
                <div class="number">({{ child.products.total }})</div>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list>
      <v-list-group
        active-class="black--text"
        v-for="item in brands"
        :key="item.title"
        v-model="item.active"
        no-action
        :ripple="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          disabled
          dense
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title>
              <div
                class="dim-black d-flex justify-space-between align-center w-100"
              >
                <div>
                  {{ child.title }}
                </div>
                <div class="number">({{ child.products.total }})</div>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    categories: [
      {
        active: true,
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" },
        ],
        title: "CATEGORY",
      },
    ],
    brands: [
      {
        active: true,
        items: [{ title: "List Item" }],
        title: "BRAND",
      },
    ],
  }),
  computed: {
    ...mapGetters("global", ["getStatic"]),
  },
  methods: {
    sendRoute(child) {
      this.$router.push({
        name: "Category",
        params: { category: child.slug, id: child.uuid },
      });
    },
  },
  created() {
    this.categories[0].items = this.getStatic[0];
    this.brands[0].items = this.getStatic[1];
  },
};
</script>

<style>
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 1rem !important;
}
.dim-black {
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
}
.number {
  margin-right: 0.3rem;
}
.v-list-item__title {
  font-size: 0.8rem;
  text-transform: capitalize;
}
</style>
