// Initialize inventory state
let inventory = {
    chickens: 0,
    legs: 0,
    wings: 0,
    flesh: 0
};

// Initialize order history
let orderHistory = [];
let orderCounter = 1;

// DOM Elements
const inventoryForm = document.getElementById('inventoryForm');
const orderForm = document.getElementById('orderForm');
const chickenCountInput = document.getElementById('chickenCount');
const legsCountSpan = document.getElementById('legsCount');
const wingsCountSpan = document.getElementById('wingsCount');
const fleshCountSpan = document.getElementById('fleshCount');
const minChickensSpan = document.getElementById('minChickens');
const orderWeightSpan = document.getElementById('orderWeight');
const remainingWeightSpan = document.getElementById('remainingWeight');
const remainingPartsSpan = document.getElementById('remainingParts');
const orderHistoryTable = document.getElementById('orderHistory');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Charts
let salesChart = null;
let inventoryChart = null;

// Update inventory display
function updateInventoryDisplay() {
    legsCountSpan.textContent = inventory.legs;
    wingsCountSpan.textContent = inventory.wings;
    fleshCountSpan.textContent = inventory.flesh;
    updateDashboard();
}

// Calculate order details
function calculateChickenOrder(legs, wings, flesh) {
    const chickensForLegs = Math.ceil(legs / 2);
    const chickensForWings = Math.ceil(wings / 2);
    const chickensForFlesh = flesh;
    const minChickens = Math.max(chickensForLegs, chickensForWings, chickensForFlesh);

    const orderWeight = (legs * 250) + (wings * 250) + (flesh * 1000);

    const legsLeft = minChickens * 2 - legs;
    const wingsLeft = minChickens * 2 - wings;
    const fleshLeft = minChickens - flesh;

    const remainingWeight = (legsLeft * 250) + (wingsLeft * 250) + (fleshLeft * 1000);

    return {
        minChickens,
        orderWeight,
        legsLeft,
        wingsLeft,
        fleshLeft,
        remainingWeight
    };
}

// Handle inventory form submission
inventoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const chickenCount = parseInt(chickenCountInput.value);
    
    inventory = {
        chickens: chickenCount,
        legs: chickenCount * 2,
        wings: chickenCount * 2,
        flesh: chickenCount
    };
    
    updateInventoryDisplay();
    showAlert('Inventory updated successfully!', 'success');
});

// Handle order form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const legs = parseInt(document.getElementById('legsOrder').value);
    const wings = parseInt(document.getElementById('wingsOrder').value);
    const flesh = parseInt(document.getElementById('fleshOrder').value);
    
    // Validate inventory
    if (legs > inventory.legs || wings > inventory.wings || flesh > inventory.flesh) {
        showAlert('Not enough inventory for this order!', 'danger');
        return;
    }
    
    const result = calculateChickenOrder(legs, wings, flesh);
    
    // Update display
    minChickensSpan.textContent = result.minChickens;
    orderWeightSpan.textContent = result.orderWeight;
    remainingWeightSpan.textContent = result.remainingWeight;
    remainingPartsSpan.textContent = `${result.legsLeft} legs, ${result.wingsLeft} wings, ${result.fleshLeft} flesh`;
    
    // Update inventory
    inventory.legs -= legs;
    inventory.wings -= wings;
    inventory.flesh -= flesh;
    
    // Add to order history
    const order = {
        id: orderCounter++,
        legs,
        wings,
        flesh,
        weight: result.orderWeight,
        date: new Date().toLocaleString()
    };
    orderHistory.push(order);
    updateOrderHistory();
    updateInventoryDisplay();
    
    showAlert('Order processed successfully!', 'success');
});

// Update order history table
function updateOrderHistory() {
    orderHistoryTable.innerHTML = orderHistory.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.legs}</td>
            <td>${order.wings}</td>
            <td>${order.flesh}</td>
            <td>${order.weight}g</td>
            <td>${order.date}</td>
        </tr>
    `).join('');
}

// Update dashboard
function updateDashboard() {
    // Update metrics
    document.getElementById('totalOrders').textContent = orderHistory.length;
    const totalSales = orderHistory.reduce((sum, order) => sum + order.weight, 0) / 1000;
    document.getElementById('totalSales').textContent = totalSales.toFixed(2);
    const avgOrderSize = orderHistory.length ? totalSales / orderHistory.length : 0;
    document.getElementById('avgOrderSize').textContent = avgOrderSize.toFixed(2);
    
    const totalInventory = inventory.legs + inventory.wings + inventory.flesh;
    const initialInventory = inventory.chickens * 5; // 2 legs + 2 wings + 1 flesh per chicken
    const utilization = initialInventory ? ((initialInventory - totalInventory) / initialInventory * 100) : 0;
    document.getElementById('inventoryUtilization').textContent = `${utilization.toFixed(1)}%`;

    // Update charts
    updateSalesChart();
    updateInventoryChart();
}

// Update sales chart
function updateSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if (salesChart) {
        salesChart.destroy();
    }

    const labels = orderHistory.map(order => order.date);
    const data = orderHistory.map(order => order.weight / 1000); // Convert to kg

    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Order Weight (kg)',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update inventory chart
function updateInventoryChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    
    if (inventoryChart) {
        inventoryChart.destroy();
    }

    inventoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Legs', 'Wings', 'Flesh'],
            datasets: [{
                data: [inventory.legs, inventory.wings, inventory.flesh],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Handle navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section, hide others
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('d-none');
            } else {
                section.classList.add('d-none');
            }
        });
    });
});

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Initialize the page
updateInventoryDisplay(); 