/* Cashier routes here */

export default [{
        path: "/customer",
        name: "customer",
        component:()=> import("../components/redgie/customer.landing"),
        meta: {
            requiresAuth: false,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/basket",
        name: "basket",
        component:()=> import("../components/redgie/customer.basket"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/checkout",
        name: "checkout",
        component:()=> import("../components/redgie/customer.checkout"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/account",
        name: "account",
        component: ()=> import("../components/redgie/customer.account"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: ()=> import("../components/redgie/forgot.password.step1"),
        meta: {
            requiresAuth: false,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/new-password",
        name: "new-password",
        component: ()=> import("../components/redgie/forgot.password.step2"),
        meta: {
            requiresAuth: false,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/account-update",
        name: "account-update",
        component: ()=> import("../components/redgie/customer.update"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/product-details",
        name: "product-details",
        component: ()=> import("../components/redgie/product.details"),
        meta: {
            requiresAuth: false,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/transaction-tracking",
        name: "transaction-tracking",
        component: ()=> import("../components/redgie/transaction.track"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/transaction-history",
        name: "transaction-history",
        component: ()=> import("../components/redgie/transaction.history"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    },
    {
        path: "/cropper",
        name: "cropper",
        component: ()=> import("../components/redgie/Imagecropper"),
        meta: {
            requiresAuth: true,
            isAdmin: false,
            isCashier: false,
            isCustomer: true
        }
    }
];