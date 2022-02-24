<template>
  <main>
    <v-app id="inspire">
      <v-data-table
        :server-items-length="total"
        :headers="headers"
        :loading="loading"
        :items="products"
        class="elevation-1"
        style="text-transform: capitalize"
        :options.sync="options"
      >
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
                    placeholder="Product Name"
                    append-icon="mdi-magnify"
                    single-line
                    v-model="params.title"
                    class="black--text text-filter input-size"
                  ></v-text-field>
                </v-col>
                <v-col lg="3">
                  <v-text-field
                    outlined
                    placeholder="Search products"
                    append-icon="mdi-magnify"
                    single-line
                    v-model="params.category"
                    class="black--text text-filter input-size"
                  ></v-text-field>
                </v-col>
                <v-col lg="4">
                  <v-text-field
                    outlined
                    class="black--text text-filter input-size"
                    placeholder="Product UUID"
                    append-icon="mdi-magnify"
                    single-line
                    v-model="params.uuid"
                  ></v-text-field>
                </v-col>
                <v-col align="center" class="text-filter-button" lg="1">
                  <v-btn color="gray--text" elevation="0"> Reset </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
        </template>
        <template v-slot:item.metadata.image="{ item }">
          <ImageResolve class="table-image" :image="item.metadata.image" />
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title | truncate(40, "...") }}
        </template>
        <template v-slot:item.created_at="{ item }">
          <div>
            {{ moment(item.created_at).format(" MMM D, YYYY") }}
          </div>
          <div class="table-time">
            {{ moment(item.created_at).format("  hh:mm A") }}
          </div>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <v-btn
            elevation="0"
            class="mx-2"
            fab
            dark
            v-show="index === active"
            small
            color="white gray--text"
          >
            <v-icon color="gray" class="mr-2" @click="toggle(item, index)">
              mdi-pencil
            </v-icon>
          </v-btn>

          <v-icon
            v-show="index === active"
            color="gray"
            class="mr-2"
            @click="toggle(item, index)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            :dark="index === active ? true : false"
            class="mr-2"
            @click="toggle(item, index)"
          >
            mdi-dots-vertical
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </main>
</template>

<script>
import ImageResolve from "../../components/ImageResolve.vue";
import moment from "moment";

export default {
  components: {
    ImageResolve,
  },
  data: () => ({
    options: {},
    moment,
    loading: false,
    total: null,
    expand: false,
    active: null,
    query: {
      page: 2,
      limit: 10,
      desc: false,
    },
    params: {
      title: "",
      uuid: "",
      category: "",
    },
    products: [],
    headers: [
      {
        text: "Image ",
        align: "start",
        sortable: false,
        value: "metadata.image",
      },
      { text: "Name", value: "title" },
      { text: "Brand", value: "brand.title" },
      { text: "Category", value: "category.title" },
      { text: "Date Created ", value: "created_at" },
      { text: "", value: "actions", sortable: false, align: "end" },
    ],
    _timerId: null,
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    params: {
      deep: true,
      handler(val) {
        if (!val) {
          return;
        }
        this.fetchEntriesDebounced();
      },
    },
  },
  methods: {
    toggle(x, i) {
      this.active = i;
    },
    fetchEntriesDebounced() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(async () => {
        await this.getDataFromApi();
      }, 1000);
    },
    async getProducts() {
      this.loading = true;
      const response = await this.$store.dispatch("global/getProducts", {
        filters: this.query,
        params: this.params,
      });

      this.products = response.data;
      this.total = response.total;
      this.loading = false;
      return response.data;
    },
    async getDataFromApi() {
      this.loading = true;
      return new Promise(async (resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        this.query.page = page;
        if (itemsPerPage === -1) {
          this.query.limit = this.total;
        } else {
          this.query.limit = itemsPerPage;
        }

        let items = await this.getProducts();
        const total = items.length;
        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          resolve({
            items,
            total,
          });
        }, 1000);
      });
    },
  },
  async mounted() {
    await this.getDataFromApi();
  },
};
</script>

<style>
.header-top {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  padding-left: 1.5rem;
}
.table-image {
  width: 3rem;
  height: 4rem;
  margin-top: 7px;
  object-fit: contain;
}
.table-time {
  font-size: 0.75rem;
  opacity: 0.7;
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
