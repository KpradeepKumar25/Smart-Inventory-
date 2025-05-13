# Smart Poultry Inventory & Order Management Website

A modern, user-friendly web application for poultry shop owners to efficiently manage inventory and process custom customer orders. Built with HTML5, CSS3, Bootstrap 5, and JavaScript (ES6+), this website runs fully in the browser-no backend required!

---

## 🚀 Features

- **Dynamic Inventory Tracking:**  
  Real-time management of chicken parts (legs, wings, flesh) as inventory is added or orders are processed.

- **Custom Order Processing:**  
  - Customers or staff specify the number of legs, wings, and flesh portions required.
  - The system instantly calculates order fulfillment and updates inventory.

- **Dashboard & Analytics:**  
  Visual representation of current inventory, sales analytics, and order history using Chart.js.

- **Order History Tracking:**  
  Every order is logged and can be reviewed for business analysis.

- **Responsive, Modern UI:**  
  Built with Bootstrap 5 for a clean, mobile-friendly, and accessible interface.

- **Low Inventory Alerts:**  
  Automatic notifications when inventory for any part drops below a set threshold.

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6+)
- **Charts & Analytics:** Chart.js
- **Backend:** None (all logic runs in the browser; data can be optionally stored in LocalStorage)

---

## 📊 Calculation Logic

**Chicken Part Mapping:**
- 1 chicken = 2 legs (250g each) + 2 wings (250g each) + 1 flesh (1kg) = 2kg

**Order Calculation Steps:**

Given an order for:
- **X** legs
- **Y** wings
- **Z** flesh portions

1. **Chickens needed for legs:**  
   `ceil(X / 2)`

2. **Chickens needed for wings:**  
   `ceil(Y / 2)`

3. **Chickens needed for flesh:**  
   `Z`

4. **Minimum chickens required:**  
   `max(ceil(X / 2), ceil(Y / 2), Z)`

5. **Order weight:**  
   `(X * 250) + (Y * 250) + (Z * 1000)` (in grams)

6. **Remaining inventory calculation:**  
   - Legs left: `min_chickens * 2 - X`
   - Wings left: `min_chickens * 2 - Y`
   - Flesh left: `min_chickens - Z`

7. **Remaining inventory weight:**  
   `(legs_left * 250) + (wings_left * 250) + (flesh_left * 1000)`

**Sample JavaScript:**
