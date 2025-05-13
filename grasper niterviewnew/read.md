# Smart Poultry Inventory & Order Management Website

A modern, user-friendly website for poultry shop owners to efficiently manage inventory and process custom customer orders. Built with HTML, CSS, and JavaScript for a seamless experience.

---

## 🚀 Features

- **Dynamic Inventory Tracking:**  
  Each chicken = 2 legs (250g each), 2 wings (250g each), 1 flesh portion (1kg)
- **Custom Order Processing:**
  - Customers can order any combination of legs, wings, and flesh.
  - System calculates total order weight and minimum chickens required.
  - Inventory updates in real-time after each order.
- **Dashboard & Analytics:**  
  Visual reports on inventory and sales.
- **Inventory Alerts:**  
  Notifications when stock is low.
- **Modern, Responsive UI:**  
  Clean, mobile-friendly design using HTML5 and CSS3.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla or with frameworks like Bootstrap, jQuery)
- **Backend:** (Optional) Node.js, Express, PHP, or Python Flask (if you want persistent data)
- **Database:** (Optional) LocalStorage, JSON files, or a database like MySQL/MongoDB

---

## 🖥️ Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- [Optional] A local server for backend features (Node.js, Python, XAMPP, etc.)

### Installation

1. **Clone or Download the Repository**

   ```
   git clone https://github.com/yourusername/poultry-inventory-website.git
   cd poultry-inventory-website
   ```

2. **Open the Website**
   - Simply open `index.html` in your browser.
   - For backend features, start your local server and navigate to the project folder.

---

## 🏗️ Project Structure

poultry-inventory-website/
├── index.html
├── styles/
│ └── style.css
├── scripts/
│ └── main.js
├── assets/
│ └── (images, icons, etc.)
└── README.md

---

## 💡 Usage

1. **Add Inventory:**  
   Enter the number of chickens in stock.
2. **Place Orders:**  
   Customers select the number of legs, wings, and flesh portions.
3. **View Results:**  
   The system calculates:
   - Total order weight
   - Minimum chickens needed
   - Remaining inventory (parts and weights)
   - Total weight of remaining inventory
4. **Dashboard:**  
   View analytics and inventory alerts.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 📧 Contact

For questions or support, contact kumarkpradeep2005@gmail.com.

---

_Empowering poultry shop owners with smart, efficient, and modern business management tools!_

logic for calclation:
def calculate_chicken_order(legs, wings, flesh):
chickens_for_legs = math.ceil(legs / 2)
chickens_for_wings = math.ceil(wings / 2)
chickens_for_flesh = flesh
min_chickens = max(chickens_for_legs, chickens_for_wings, chickens_for_flesh)

    order_weight = (legs * 250) + (wings * 250) + (flesh * 1000)

    legs_left = min_chickens * 2 - legs
    wings_left = min_chickens * 2 - wings
    flesh_left = min_chickens - flesh

    remaining_weight = (legs_left * 250) + (wings_left * 250) + (flesh_left * 1000)

    return {
        "min_chickens": min_chickens,
        "order_weight": order_weight,
        "legs_left": legs_left,
        "wings_left": wings_left,
        "flesh_left": flesh_left,
        "remaining_weight": remaining_weight
    }
