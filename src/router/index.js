import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "User",
    component: () => import("../layouts/User.vue"),
    redirect: {
      name: "Products",
    },
    children: [
      {
        path: "products",
        name: "Products",
        component: () => import("../views/user/Products.vue"),
      },
      {
        path: "category/:category/:id",
        name: "Category",
        component: () => import("../views/user/Category.vue"),
      },
      {
        path: "product-page/:id",
        name: "ProductPage",
        component: () => import("../views/user/Products.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: {
      name: "customersAdmin",
    },
    component: () => import("../layouts/Admin.vue"),
    children: [
      {
        path: "tickets",
        name: "TicketsAdmin",
        component: () => import("../views/admin/Tickets.vue"),
      },
      {
        path: "shipment-locator",
        name: "ShipmentLocatorAdmin",
        component: () => import("../views/admin/Locator.vue"),
      },
      {
        path: "customers",
        name: "customersAdmin",
        component: () => import("../views/admin/Customers.vue"),
      },
      {
        path: "products",
        name: "ProductsAdmin",
        component: () => import("../views/admin/Products.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
