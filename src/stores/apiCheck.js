import { defineStore } from "pinia"
import { ref } from "vue"

export const useApiCheckStore = defineStore('apiCheck', () => {
  const options = ref([
    { id: 1, label: "POST /login", checked: false },
    { id: 2, label: "POST /register", checked: false },
    { id: 3, label: "POST /renew-token", checked: false },
    { id: 4, label: "GET /verify-token", checked: false },

    { id: 5, label: "GET /users/me", checked: false },
    { id: 6, label: "PUT /users/me", checked: false },
    { id: 7, label: "DELETE /users/me", checked: false },
    { id: 8, label: "POST /users/create-moderator", checked: false },
    { id: 9, label: "PUT /users/image", checked: false },

    { id: 10, label: "GET /addresses/", checked: false },
    { id: 11, label: "POST /addresses/", checked: false },
    { id: 12, label: "GET /addresses/{address_id}", checked: false },
    { id: 13, label: "PUT /addresses/{address_id}", checked: false },
    { id: 14, label: "DELETE /addresses/{address_id}", checked: false },

    { id: 15, label: "GET /categories/", checked: false },
    { id: 16, label: "POST /categories/", checked: false },
    { id: 17, label: "GET /categories/user/{user_id}", checked: false },
    { id: 18, label: "GET /categories/{category_id}", checked: false },
    { id: 19, label: "PUT /categories/{category_id}", checked: false },
    { id: 20, label: "DELETE /categories/{category_id}", checked: false },

    { id: 21, label: "GET /discounts/", checked: false },
    { id: 22, label: "POST /discounts/", checked: false },
    { id: 23, label: "GET /discounts/{discount_id}", checked: false },
    { id: 24, label: "PUT /discounts/{discount_id}", checked: false },
    { id: 25, label: "DELETE /discounts/{discount_id}", checked: false },

    { id: 26, label: "GET /coupons/", checked: false },
    { id: 27, label: "POST /coupons/", checked: false },
    { id: 28, label: "GET /coupons/{coupon_id}", checked: false },
    { id: 29, label: "PUT /coupons/{coupon_id}", checked: false },
    { id: 30, label: "DELETE /coupons/{coupon_id}", checked: false },

    { id: 31, label: "GET /products/", checked: false },
    { id: 32, label: "POST /products/", checked: false },
    { id: 33, label: "GET /products/user/{user_id}", checked: false },
    { id: 34, label: "GET /products/category/{category_id}", checked: false },
    { id: 35, label: "GET /products/{product_id}", checked: false },
    { id: 36, label: "PUT /products/{product_id}", checked: false },
    { id: 37, label: "DELETE /products/{product_id}", checked: false },
    { id: 38, label: "PUT /products/{product_id}/stock", checked: false },

    { id: 39, label: "GET /cart/", checked: false },
    { id: 40, label: "POST /cart/", checked: false },
    { id: 41, label: "GET /cart/items", checked: false },
    { id: 42, label: "PUT /cart/items", checked: false },
    { id: 43, label: "POST /cart/items", checked: false },
    { id: 44, label: "DELETE /cart/items", checked: false },
    { id: 45, label: "DELETE /cart/clear", checked: false },

    { id: 46, label: "GET /orders/", checked: false },
    { id: 47, label: "POST /orders/", checked: false },
    { id: 48, label: "GET /orders/{order_id}", checked: false },
    { id: 49, label: "PUT /orders/{order_id}", checked: false },
    { id: 50, label: "DELETE /orders/{order_id}", checked: false }
  ])

  return {
    options,
  }
}, {
  persist: true
})
