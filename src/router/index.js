import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

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
        component: () => import("../views/user/ProductPage.vue"),
      },
    ],
  },
  {
    path: "/cart",
    component: () => import("../layouts/Cart.vue"),
    redirect: {
      name: "",
    },
    children: [
      {
        path: "",
        name: "Cart",
        component: () => import("../views/user/Cart.vue"),
      },
      {
        path: "category/:category/:id",
        name: "Category",
        component: () => import("../views/user/Category.vue"),
      },
      {
        path: "product-page/:id",
        name: "ProductPage",
        component: () => import("../views/user/ProductPage.vue"),
      },
    ],
  },
  {
    path: "/admin",

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
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

export default router;
